import { computed, get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';

import ShowdownComponent from 'ember-cli-showdown/components/markdown-to-html';

export default ShowdownComponent.extend({
  codePrettify: inject(),

  classNames: ['markdown-content'],

  html: computed('markdown', 'converter', function() {
    scheduleOnce('afterRender', this, function() {
      get(this, 'codePrettify').prettify();
    });

    return this._super(...arguments);
  }).readOnly()

});
