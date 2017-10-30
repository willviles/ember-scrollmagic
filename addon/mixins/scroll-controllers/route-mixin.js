import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  scrollMagic: service(),

  activate() {
    this._super(...arguments);
    get(this, 'scrollMagic').addController();
  },

  willDestroy() {
    this._super(...arguments);
    get(this, 'scrollMagic').destroyController();
  }

});
