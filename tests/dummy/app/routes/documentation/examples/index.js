import Route from '@ember/routing/route';
import { hash } from 'rsvp';

import { examples } from '../../../examples';

export default Route.extend({

  model() {
    return hash({
      examples
    })
  }

});
