import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

import {
  computed,
  get,
  getProperties,
  getWithDefault,
  set
} from '@ember/object';

import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';
import { typeOf } from '@ember/utils';

export default Mixin.create({

  scrollMagic: service(),

  scrollController: computed(function() {
    return get(this, 'scrollMagic').getController();
  }),

  availableSceneOptions: computed(function() {
    return A([
      'duration', 'loglevel', 'offset', 'reverse', 'triggerElement', 'triggerHook'
    ]);
  }),

  defaultOptions: computed(function() {
    return {
      duration: `100%`,
      triggerHook: `onEnter`,
      triggerElement: this.element
    };
  }),

  sceneOptions: computed(function() {
    return {};
  }),

  mergedOptions: computed('defaultOptions', 'sceneOptions', function() {
    let { defaultOptions, sceneOptions } = getProperties(this, 'defaultOptions', 'sceneOptions');
    if (!defaultOptions || !sceneOptions) { return; }
    return assign({}, defaultOptions, sceneOptions);
  }),

  setScene() {
    let scene = this.setupScene();
    this.addIndicators(scene);
    this.addSceneEventHandlers(scene);
    set(this, 'scene', scene);
  },

  setupScene() {
    assert(`No setupScene defined.`);
  },

  updateScene(changedValues) {
    let scene = get(this, 'scene');

    Object.keys(changedValues).forEach(key => {
      let updateFunc = scene[key],
          value = changedValues[key];

      if (typeOf(updateFunc) === 'function') {
        updateFunc(value);
      }
    });

    scene.refresh();
  },

  addIndicators(scene) {
    let indicators = getWithDefault(this, 'indicators', false),
        type = typeOf(indicators);

    if (indicators === true || type === 'object') {
      let options = type === 'object' ? JSON.parse(JSON.stringify(indicators)) : {};
      scene.addIndicators(options);
    }
  },

  sceneEvents: computed(function() {
    return ['change', 'update', 'progress', 'start', 'end', 'enter', 'leave'];
  }),

  onSceneChange() {},
  onSceneUpdate() {},
  onSceneProgress() {},
  onSceneStart() {},
  onSceneEnd() {},
  onSceneEnter() {},
  onSceneLeave() {},

  addSceneEventHandlers(scene) {
    get(this, 'sceneEvents').forEach(key => {
      let action = get(this, `onScene${capitalize(key)}`);
      scene.on(`${key}.${this.elementId}`, action);
    });

  },

  removeSceneEventHandlers(scene) {
    get(this, 'sceneEvents').forEach(key => {
      scene.off(`${key}.${this.elementId}`);
    });
  },

  didRender() {
    this._super(...arguments);

    let scrollMagic = get(this, 'scrollMagic'),
        sceneInitialized = get(this, 'sceneInitialized');

    if (get(scrollMagic, 'isFastBoot') || sceneInitialized === true) { return; }

    this.setScene();

    let controller = get(this, 'scrollController'),
        scene = get(this, 'scene');

    controller.addScene(scene);

    set(this, 'sceneInitialized', true);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    let availableSceneOptions = get(this, 'availableSceneOptions'),
        sceneOptions = get(this, 'sceneOptions'),
        scene = get(this, 'scene');

    if (!sceneOptions || get(this, 'isDestroyed')) { return; }

    let newValues = availableSceneOptions.reduce((values, key) => {
      let value = get(this, key);
      values[key] = value;
      return values;
    }, {});

    let changedValues = {};

    Object.keys(newValues).forEach(key => {
      let value = newValues[key];
      if (value !== sceneOptions[key]) {
        sceneOptions[key] = value;
        changedValues[key] = value;
      }
    });

    set(this, 'sceneOptions', sceneOptions);

    if (get(this, 'sceneInitialized')) {
      if (scene) {
        this.updateScene(changedValues);
      } else {
        this.setScene();
      }

    }
  },

  willDestroyElement() {
    this._super(...arguments);
    let scene = get(this, 'scene');
    if (scene) {
      this.removeSceneEventHandlers(scene);
      scene.remove();
    }
  }

});
