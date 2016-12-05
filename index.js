/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-scrollmagic',

  included: function(app) {

    this._super.included(app);

    var options = app.options.scrollMagic;

    if (!process.env.EMBER_CLI_FASTBOOT) {

      app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js');

      if (options && options.library === 'velocity') {
        app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity.js');
      } else {
        app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');
      }

      if (options && options.indicators === true) {
        app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');
      }

      app.import('vendor/scrollmagic-shim.js', {
        exports: {
          scrollmagic: ['default']
        }
      });

    }

  },
};
