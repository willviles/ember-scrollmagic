import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({

  example: readOnly('model.example'),
  nextExample: readOnly('model.nextExample')

})
