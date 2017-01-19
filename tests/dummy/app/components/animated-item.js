import Ember from 'ember';
import { TimelineMax, TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';

const { get, inject: { service }, String: { camelize }} = Ember;

export default Ember.Component.extend({

  dataBindings: ['animation:data-animation'],

  scrollMagic: service(),

  didInsertElement() {
    Ember.assert(`Must specify 'animation' property`, get(this, 'animation'));

    this.setAnimation();
  },

  setAnimation() {
    const scene = new ScrollMagic.Scene({
                    triggerElement: this.$()[0],
                    duration: get(this, 'duration')
                  })
                  .setTween(get(this, 'timeline'));

    get(this, 'scrollMagic').getController().addScene(scene);

  },

  duration: window.innerHeight * 0.3,

  timeline: Ember.computed('animation', function() {
    let timeline = new TimelineMax(),
        animation = get(this, `animations.${camelize(get(this, 'animation'))}`);

    timeline.add(
      TweenMax.fromTo(this.$(), 1, animation[0], animation[1])
    );

    return timeline;
  }),

  animations: {
    fade: [{
      opacity: 0
    }, {
      opacity: 1
    }],

    fadeUp: [
      {
        opacity: 0, y: '10%'
      },
      {
        opacity: 1, y: '0%'
      }
    ]
  }

});
