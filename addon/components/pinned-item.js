import Component from '@ember/component';
import { computed, get } from '@ember/object';

import ScrollMagic from 'scrollmagic';

import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/component-scene-mixin';

export default Component.extend(
  ScrollMagicComponentMixin, {

  defaultOptions: computed(function() {
    return {
      duration: `100%`,
      triggerHook: `onLeave`,
      triggerElement: this.element
    };
  }),

  pinElement: computed(function() {
    return this.element;
  }),

  pinElementId: computed('pinElement', function() {
    let pinElement = get(this, 'pinElement');
    if (!pinElement) { return; }
    return `#${pinElement.getAttribute('id')}`;
  }),

  pinOptions: computed(function() {
    return {
      pushFollowers: true,
      spacerClass: '.scrollmagic-pin-spacer'
    }
  }),

  setupScene() {
    let opts = get(this, 'mergedOptions'),
        pinElementId = get(this, 'pinElementId'),
        pinOptions = get(this, 'pinOptions');

    return new ScrollMagic.Scene(opts).setPin(pinElementId, pinOptions);
  }

});
