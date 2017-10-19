import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  
  model({ example_slug }) {
    return hash({
      exampleId: example_slug
    });
  }

})
