/* eslint-env node:true */
/* globals module */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall(/*options*/) {
    return this.addPackagesToProject(
      [
        { name: 'ember-gsap', target: 'latest' }
      ]
    );
  }
};
