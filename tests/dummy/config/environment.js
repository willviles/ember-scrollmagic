/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'router-scroll',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // @addon Ember ScrollMagic
  // @url https://github.com/willviles/ember-scrollmagic

  ENV['ember-scrollmagic'] = {
    indicators: true
  };

  // @addon Ember CLI Markdown Resolver
  // @url https://github.com/willviles/ember-cli-markdown-resolver

  ENV['ember-cli-markdown-resolver'] = {
    folders: {
      guides: 'app/guides'
    }
  };

  // @addon Ember Code Prettify
  // @url https://github.com/willviles/ember-code-prettify

  ENV['ember-code-prettify'] = {
    languages: ['css', 'yaml'],
    skin: 'desert'
  };

  // @addon Ember CLI Google Fonts
  // @url https://github.com/damiencaselli/ember-cli-google-fonts

  ENV['googleFonts'] = [
    'Overpass:300,400,800'
  ];

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
