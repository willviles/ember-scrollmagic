/* eslint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');
var path = require('path');

module.exports = {
  name: 'ember-scrollmagic',

  included(app) {

    this.addonConfig = this.app.project.config(app.env)['ember-scrollmagic'] || {};

    if (!isFastBoot()) {

      const vendor = this.treePaths.vendor;

      // Main modules
      app.import(vendor + '/scrollmagic/ScrollMagic.js');
      app.import(vendor + '/scrollmagic/plugins/animation.gsap.js');

      // Add indicators
      if (this.addonConfig.indicators) {
        app.import(vendor + '/scrollmagic/plugins/debug.addIndicators.js');
      }

      // Expose `import` via a shim
      app.import('vendor/scrollmagic-shim.js', {
        exports: {
          scrollmagic: ['default']
        }
      });

    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(moduleToFunnel('scrollmagic'));

    return mergeTrees(trees);
  },

};

function moduleToFunnel(moduleName, destination) {
  destination = destination || moduleName;
  return new Funnel(resolveModulePath(moduleName), {
    destDir: destination
  });
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
