/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;
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
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(moduleToFunnel('scrollmagic'));

    return mergeTrees(trees);
  },

};

function moduleToFunnel(moduleName, destination) {
  let tree = new Funnel(resolveModulePath(moduleName), {
    destDir: destination || moduleName
  });
  return map(tree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
