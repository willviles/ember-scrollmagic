/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-scrollmagic',

  included: function(app) {

    this._super.included(app);

    this.app = app;
    this.addonConfig = this.app.project.config(app.env)['ember-scrollmagic'] || {};
    this.addonBuildConfig = this.app.options['ember-scrollmagic'] || {};

    if (!process.env.EMBER_CLI_FASTBOOT) {

      // Import main ScrollMagic library
      this.app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js');

      // Import GSAP animation plugin
      this.app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');

      // Import indicator plugin
      if (this.addonConfig.indicators) {
        console.log('ADDING INDICATORS');
        this.app.import(app.bowerDirectory + '/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');
      }

    }

    this.app.import('vendor/scrollmagic-shim.js', {
      exports: {
        scrollmagic: ['default']
      }
    });

  },
};
