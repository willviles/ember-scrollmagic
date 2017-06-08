import Ember from 'ember';
import ScrollMagic from 'scrollmagic';

const {
  get,
  isEmpty,
  computed,
  on,
  inject: {
    service
  },
  run: {
    debounce
  }
} = Ember;

export default Ember.Service.extend({

  routing: service('-routing'),

  isFastBoot: computed(function() {
    return typeof FastBoot !== 'undefined';
  }),

  controllers: Ember.A([]),

  addController(id, opts) {
    if (get(this, 'isFastBoot')) { return; }

    opts = opts || {};

    let register = {
      id,
      _controller: new ScrollMagic.Controller(opts)
    };

    get(this, 'controllers').pushObject(register);

    return register.controller;

  },

  destroyController(id) {
    if (get(this, 'isFastBoot')) { return; }

    let controllers = get(this, 'controllers'),
        controller = this.getControllerRegistration(id);

    controller._controller.destroy();
    controllers.removeObject(controller);

  },

  getControllerRegistration(id) {
    let controllers = get(this, 'controllers');

    if (isEmpty(id)) {
      id = get(this, 'routing.currentPath');
    }

    let controller = controllers.findBy('id', id);
    if (isEmpty(controller)) { return; }

    return controller;

  },

  getController(id) {
    let controller = this.getControllerRegistration(id);

    if (isEmpty(controller)) { return; }

    return controller._controller;

  },

  updateController(id) {
    if (get(this, 'isFastBoot')) { return; }

    let controller = this.getController(id);

    if (isEmpty(controller)) { return; }

    Ember.run.scheduleOnce('afterRender', () => {
      controller.update();
    });

  },

  windowResize: on('init', function() {
    if (get(this, 'isFastBoot')) { return; }

    Ember.$(window).bind('resize', () => {
      debounce(this, '_updateOnResize', 150);
    });

  }),

  _updateOnResize() {
    get(this, 'controllers').forEach(({ _controller }) => {
      _controller.update();
    });

  },


});
