/* eslint ember/alias-model-in-controller: 0 */
import Component from '@ember/component';
import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export function initialize() {
  let URLMixin = {
    config: service(),
    fastboot: service(),
    baseURL: computed(function() {
      if (get(this, 'fastboot.isFastBoot')) {
        let protocol = get(this, 'fastboot.request.protocol');
        let host = get(this, 'fastboot.request.host');
        return `${protocol}://${host}`;
      } else {
        let pathArray = window.location.href.split('/');
        return `${pathArray[0]}//${pathArray[2]}`;
      }
    }),
    rootURL: readOnly('config.rootURL')
  };

  Component.reopen(URLMixin);
  Controller.reopen(URLMixin);
  Route.reopen(URLMixin);

  URLMixin = null;

  Route.reopen({
    fastboot: service(),
    routeURL: computed(function() {
      return get(this, 'fastboot.isFastBoot') ?
        `${get(this, 'baseURL')}${get(this, 'rootURL')}${get(this, 'fastboot.request.path')}` :
        window.location.href;
    })
  });

}

export default {
  name: 'inject-urls',
  initialize
};
