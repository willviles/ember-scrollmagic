import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('documentation', function() {
    this.route('guides', function() {
      this.route('single', { path: '/*path' });
    });

    this.route('examples', function() {
      this.route('example', { path: '/:example_slug'});
    });
  });

});

export default Router;
