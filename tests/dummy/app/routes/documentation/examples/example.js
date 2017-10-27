import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { get } from '@ember/object';
import { hash, reject } from 'rsvp';

import { examples } from '../../../examples';

export default Route.extend({

  titleToken({ example }) {
    return get(example, 'title');
  },

  model({ example_slug: slug }) {
    let examplesRegistry = A(examples),
        nextExample;

    let example = examplesRegistry.find((example, i) => {
      let e = get(example, 'slug') === slug;
      nextExample = examplesRegistry.objectAt(i + 1);
      return e;
    });

    if (!example) { return reject(); }

    return hash({
      example,
      nextExample
    });
  },

  renderTemplate(controller, model) {
    let exampleSlug = get(model, 'example.slug');

    this.render(`documentation.examples.templates.${exampleSlug}`);
    this.render(`documentation.examples.partials.next-example`, {
      controller,
      outlet: 'next-example'
    })
  }

})
