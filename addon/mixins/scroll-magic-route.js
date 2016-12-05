import Ember from 'ember';

const { get, set, inject: { service }} = Ember;

export default Ember.Mixin.create({

  fastboot: service(),
  scrollMagic: service(),

  activate() {
    const opts = get(this, 'scrollMagicController');
    get(this, 'scrollMagic').addController(get(this, 'routeName'), opts);
    console.log(get(this, 'scrollMagic.controllers'));

    this._super(...arguments);
  },

  scrollMagicController: {},

  deactivate() {
    this._super(...arguments);

    get(this, 'scrollMagic').destroyController(get(this, 'routeName'));

  },

  actions: {
    didTransition() {
      this._super(...arguments);

      get(this, 'scrollMagic').updateController();

    }
  }

});
