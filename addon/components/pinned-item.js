import Component from '@ember/component';
import Mixin from '@ember/object/mixin';
import { computed, get } from '@ember/object';

import ScrollMagic from 'scrollmagic';
import ScrollMagicSceneMixin from 'ember-scrollmagic/mixins/components/scene-mixin';

export const ScrollMagicPinnedMixin = Mixin.create(
  ScrollMagicSceneMixin, {

  defaultOptions: computed(function() {
    return {
      duration: 0,
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
      pushFollowers: false,
      spacerClass: 'scrollmagic-pin-spacer'
    }
  }),

  setupScene() {
    let opts = get(this, 'mergedOptions'),
        pinElementId = get(this, 'pinElementId'),
        pinOptions = get(this, 'pinOptions');

    pinOptions = JSON.parse(JSON.stringify(pinOptions));

    return new ScrollMagic.Scene(opts).setPin(pinElementId, pinOptions);
  }
});

export default Component.extend(ScrollMagicPinnedMixin);
