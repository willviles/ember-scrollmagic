import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  scrollMagic: service(),

  willRender() {
    this._super(...arguments);
    let scrollMagic = get(this, 'scrollMagic');
    let controller = scrollMagic.getController(`${this.elementId}`);
    if (controller) { return; }
    scrollMagic.addController(`${this.elementId}`);
  },

  willDestroyElement() {
    this._super(...arguments);
    get(this, 'scrollMagic').destroyController(`${this.elementId}`);
  }

});
