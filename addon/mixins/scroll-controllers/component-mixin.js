import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  scrollMagic: service(),

  willRender() {
    this._super(...arguments);
    let scrollMagic = get(this, 'scrollMagic');
    let controller = scrollMagic.getController(`${this.elementId}`);
    if (controller) { return; }
    let scrollController = scrollMagic.addController(`${this.elementId}`);
    set(this, 'scrollController', scrollController);
  },

  willDestroyElement() {
    this._super(...arguments);
    get(this, 'scrollMagic').destroyController(`${this.elementId}`);
    set(this, 'scrollController', null);
  }

});
