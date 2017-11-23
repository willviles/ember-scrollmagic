import Component from '@ember/component';
import Mixin from '@ember/object/mixin';
import { computed, get } from '@ember/object';

import ScrollMagic from 'scrollmagic';
import ScrollMagicSceneMixin from 'ember-scrollmagic/mixins/components/scene-mixin';

import layout from 'ember-scrollmagic/templates/components/pinned-item';

export const ScrollMagicPinnedMixin = Mixin.create(
  ScrollMagicSceneMixin, {

  layout,

  defaultOptions: computed(function() {
    return {
      duration: 0,
      triggerHook: `onLeave`,
      triggerElement: this.element
    };
  }),

  pinElementId: computed(function() {
    return `scrollmagic-pin-${this.elementId}-target`;
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

    return new ScrollMagic.Scene(opts).setPin(`#${pinElementId}`, pinOptions);
  }
});

export default Component.extend(ScrollMagicPinnedMixin);
