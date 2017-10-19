import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { warn } from '@ember/debug';
import { default as EmberObject, computed, get, set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

import { task, timeout } from 'ember-concurrency';

import ScrollMagic from 'scrollmagic';
import $ from 'jquery';

export default Service.extend({

  fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  isFastBoot: computed(function() {
    return get(this, 'fastboot.isFastBoot') === true;
  }),

  init() {
    this._super(...arguments);
    set(this, 'registry', EmberObject.create({}));
    this.addResizeHandler();
  },

  willDestroy() {
    this._super(...arguments);
    this.removeResizeHandler();
  },

  addController(id = `application`, opts = {}) {
    if (get(this, 'isFastBoot')) { return; }
    let controller = new ScrollMagic.Controller(opts);
    set(this, `registry.${id}`, controller);
    return controller;
  },

  getController(id = `application`) {
    if (get(this, 'isFastBoot')) { return; }
    return get(this, `registry.${id}`);
  },

  updateController(id = `application`) {
    if (get(this, 'isFastBoot')) { return; }
    let controller = get(this, `registry.${id}`);
    if (!controller) {
      let msg = `Cannot update ScrollMagic controller - not registered.`,
          msgid = `scrollmagic-controller-not-registered`
      return warn(msg, { id: msgid });
    }
    scheduleOnce('afterRender', () => {
      controller.update();
    });
  },

  updateControllers: task(function* () {
    yield timeout(200);
    let registry = get(this, 'registry');
    Object.keys(registry).forEach(id => {
      this.updateController(id);
    });
  }).restartable(),

  destroyController(id = `application`) {
    if (get(this, 'isFastBoot')) { return; }
    let controller = get(this, `registry.${id}`);
    if (!controller) {
      let msg = `Cannot delete ScrollMagic controller - not registered.`,
          msgid = `scrollmagic-controller-not-registered`
      return warn(msg, { id: msgid });
    }
    controller.destroy();
    set(this, `registry.${id}`, null);
  },

  addResizeHandler() {
    if (get(this, 'isFastBoot')) { return; }
    $(window).bind('resize.emberScrollMagic', () => {
      get(this, 'updateControllers').perform();
    });
  },

  removeResizeHandler() {
    if (get(this, 'isFastBoot')) { return; }
    $(window).unbind('resize.emberScrollMagic');
  }

});
