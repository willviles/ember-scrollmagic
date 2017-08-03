/* eslint-env node */
'use strict';

const BroccoliDebug = require('broccoli-debug');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');

module.exports = {
  name: 'ember-scrollmagic',

  included(app) {
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    this.addonConfig = this.app.project.config(app.env)['ember-scrollmagic'] || {};

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

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
        trees = [];

    if (vendorTree) {
      trees.push(
        debugTree(vendorTree, 'vendorTree')
      );
    }

    let js = fastbootTransform(
      moduleToFunnel('scrollmagic')
    );

    trees.push(
      debugTree(js, 'js')
    );

    return mergeTrees(trees);
  },

};

function moduleToFunnel(moduleName, destination) {
  return new Funnel(resolveModulePath(moduleName), {
    destDir: destination || moduleName
  });
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
