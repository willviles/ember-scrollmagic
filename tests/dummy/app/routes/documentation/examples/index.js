import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';
import { hash } from 'rsvp';

import examples from '../../../examples';

export default Route.extend({

  model() {
    return hash({
      examples: examples.map(example => {
        return assign({}, example, {
          slug: dasherize(example.title)
        });
      })
    })
  }

});
