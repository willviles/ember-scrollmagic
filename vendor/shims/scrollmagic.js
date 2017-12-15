/* eslint-env node:true */

(function() {
  /* globals define, self */

  function scrollMagicUndefined() {
    var error = "ScrollMagic is not available. Either the bower package is missing or your app is in Fastboot Mode.";

    function throwError() {
      throw Error(error);
    }

    this.Scene = throwError();
    this.Controller = throwError();

    throwError();
  }

  define('scrollmagic', [], function() {
    'use strict';
    return { 'default': self['ScrollMagic'] || scrollMagicUndefined };
  });

})();
