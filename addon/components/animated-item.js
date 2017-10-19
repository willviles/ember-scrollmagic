import Component from '@ember/component';
import { assert } from '@ember/debug';

import {
  default as EmberObject,
  computed,
  get
} from '@ember/object';

import ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenLite } from 'gsap';

import defaultAnimations from 'ember-scrollmagic/utils/animations';
import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/component-scene-mixin';

export default Component.extend(
  ScrollMagicComponentMixin, {

  setupScene() {
    let opts = get(this, 'mergedOptions'),
        timeline = get(this, 'timeline');

    return new ScrollMagic.Scene(opts).setTween(timeline)
  },

  animation: computed(function() {
    assert(`Please define an animation type for ScrollMagic animated component`);
  }),

  animations: computed(function() {
    return EmberObject.create(defaultAnimations);
  }),

  timeline: computed('animation', function() {
    let name = get(this, 'animation'),
        animation = get(this, `animations.${name}`);

    assert(`ScrollMagic animation '${name}' does not exist.`, animation);

    return new TimelineMax().add(
      TweenLite.fromTo(this.element, 1, ...animation)
    );

  })

});
