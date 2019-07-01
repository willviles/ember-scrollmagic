import Controller from '@ember/controller';
import {
  default as EmberObject,
  computed,
  get,
  set
} from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import { TweenLite } from 'gsap';

export default Controller.extend({

  scrollMagic: service(),

  example: readOnly('model.example'),
  nextExample: readOnly('model.nextExample'),

  init() {
    this._super(...arguments);

    set(this, 'interactivity', EmberObject.create({
      'basic-animations': {
        duration: 100,
        durationPercentage: computed('duration', function() {
          return `${get(this, 'duration')}%`;
        }),
        triggerHook: 0.75
      },
      'pinned-items': {
        scrollToTop() {
          TweenLite.to(window, 0.5, { scrollTo: 0 });
        }
      }
    }));
  },

  props: computed('example', function() {
    let slug = get(this, 'example.slug');
    return get(this, `interactivity.${slug}`);
  })

})
