import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({

  examples: readOnly('model.examples')

})
