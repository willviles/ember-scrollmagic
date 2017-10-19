import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed, get } from '@ember/object';

import ScrollMagic from 'scrollmagic';
import $ from 'jquery';

import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/component-scene-mixin';

export default Component.extend(
  ScrollMagicComponentMixin, {

  defaultOptions: computed(function() {
    return {
      duration: `100%`,
      triggerHook: `onEnter`,
      triggerElement: this.element
    };
  }),

  toggleClasses: computed(function() {
    assert(`No classes defined for 'scrollmagic-toggle' to toggle`);
  }),

  toggleElement: computed(function() {
    return this.element;
  }),

  setupScene() {
    let opts = get(this, 'mergedOptions'),
        toggleElement = get(this, 'toggleElement'),
        $toggleElement = $(toggleElement),
        toggleClasses = get(this, 'toggleClasses');

    // NOTE: ScrollMagic.Scene().setClassToggle is currently BROKEN!
    //
    // This will not work when multiple classes are added:
    // return new ScrollMagic.Scene(opts).setClassToggle(toggleElementId, toggleClasses);
    //
    // The following issue is related:
    // https://github.com/janpaepke/ScrollMagic/issues/313
    //
    // The workaround uses scene enter and leave events to achieve the same goal.

    let scene = new ScrollMagic.Scene(opts);

    scene.on(`enter.${this.elementId}-toggle`, () => {
      $toggleElement.addClass(toggleClasses);
    });

    scene.on(`leave.${this.elementId}-toggle`, function(){
      $toggleElement.removeClass(toggleClasses);
    });

    return scene;
  },

  willDestroyElement() {
    let scene = get(this, 'scene');

    if (scene) {
      scene.off(`enter.${this.elementId}-toggle`);
      scene.off(`leave.${this.elementId}-toggle`);
    }

    this._super(...arguments);
  }

});
