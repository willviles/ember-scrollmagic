import Ember from 'ember';

const { get, set, inject: { service }} = Ember;

export default Ember.Mixin.create({

  scrollMagic: service(),

  activate() {
    const opts = get(this, 'scrollMagicController') || {};
    get(this, 'scrollMagic').addController(get(this, 'routeName'), opts);

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
