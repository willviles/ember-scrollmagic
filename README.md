<img src="https://user-images.githubusercontent.com/2046935/30335364-0c508374-97da-11e7-8552-6a5a6e6fa820.png" width="auto" height="70">

Ember ScrollMagic ![Download count all time](https://img.shields.io/npm/dt/ember-scrollmagic.svg) [![npm](https://img.shields.io/npm/v/ember-scrollmagic.svg)](https://www.npmjs.com/package/ember-scrollmagic)
======

Ember ScrollMagic is an Ember addon for using [ScrollMagic](https://github.com/janpaepke/ScrollMagic) - the javascript library for magical scroll interactions.

## Installation

ScrollMagic uses [GSAP (Greensock Animation Platform)](https://github.com/greensock/GreenSock-JS) for full animation tweening. Ember ScrollMagic will automatically install [Ember GSAP](https://github.com/willviles/ember-gsap) into your application.

```bash
ember install ember-scrollmagic
```

## Documentation

Please refer to the ScrollMagic [docs](http://scrollmagic.io/docs/index.html) for information on using controllers and scenes. For ideas and inspiration of what to create with ScrollMagic, check out the [examples](http://scrollmagic.io/examples/).

## Usage

### Route Mixin

Ember ScrollMagic handles the creation and removal of ScrollMagic controllers using a simple route mixin. Simply define any [controller options](http://scrollmagic.io/docs/ScrollMagic.Controller.html#constructor) in a `scrollMagicController` object inside your route.

```javascript
import Ember from 'ember';
import ScrollMagicRouteMixin from 'ember-scrollmagic/route-mixin';

export default Ember.Route.extend(ScrollMagicRouteMixin, {

  scrollMagicController: {
    globalSceneOptions: {
      triggerHook: 'onLeave'
    },
    // ...
  }

});
```

### Animated Components

To attach scenes to the current route's scroll controller, inject the `scrollMagic` service into the component you wish to animate and use `getController()`. The following example will animate the component's opacity from 0 to 1 when it is triggered.

```javascript
import Ember from 'ember';
import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';

export default Ember.Component.extend({
  scrollMagic: Ember.inject.service(),

  willRender() {
    this._super(...arguments);
    this.setupAnimation();
    this.set('rendered', true);

  },

  setupAnimation() {
    // Ensure animation setup only fires on the initial render
    if (this.get('rendered') === true) { return; }

    // Grab the scroll controller for the current route
    let scrollController = this.get('scrollMagic').getController();

    // Create the scene using this.element
    let scene = new ScrollMagic.Scene({
      triggerElement: this.element
    });

    // Define the tween
    let tween = TweenLite.fromTo(this.$(), 1, { opacity: 0 }, { opacity: 1 });

    // Set the tween
    scene.setTween(tween);

    // Add the scene to the scroll controller
    scrollController.addScene(scene);

  }

});
```

## Custom Controllers

The `scrollMagic` service exposes some key functions to enable custom implementation of scroll controllers.

### Add, Update & Destroy

You may like to implement the following pattern when adding ScrollMagic to scrollable components such as overlays and modals.

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  scrollMagic: Ember.inject.service(),

  // Add a controller with ID 'foo'
  init() {
    this._super(...arguments);
    this.get('scrollMagic').addController('foo', {
      container: this.element
    });
  },

  // Update the controller on a new render
  didRender() {
    this._super(...arguments);
    this.get('scrollMagic').updateController('foo');
  },

  // Destroy when the component is destroyed
  willDestroyElement() {
    this._super(...arguments);
    this.get('scrollMagic').destroyController('foo');
  }

})
```

### Attach Scenes

```javascript
let controller = this.get('scrollMagic').getController('foo');
controller.addScene(/* GSAP Animation */);
```

### Resizing

Every ScrollMagic controller will update itself on a window resize, with a debounce of 150ms. To manually update a ScrollMagic controller, simply do:

```javascript
let { _controller } = this.get('scrollMagic').getController('foo');
_controller.update();
```

### Indicators

To include the indicator plugin, add the following to your `config/environment.js` file.

```javascript
ENV['ember-scrollmagic'] = {
  indicators: true
};
```

To activate, add the `addIndicators` option to a ScrollMagic scene or in a controller's `globalSceneOptions`.

## Issues

**Nested routes**

Currently, maintaining an animated component's state when navigating to a nested route is only possible using custom scroll controllers. Issue [#6](https://github.com/willviles/ember-scrollmagic/issues/6) details a possible solution for this problem.

## Fastboot

Ember ScrollMagic >=0.2.0 and [Ember GSAP](https://github.com/willviles/ember-gsap) >=0.3.0 are fully compatible with all versions of [Ember CLI Fastboot](https://github.com/ember-fastboot/ember-cli-fastboot).

## Contributing

* `git clone https://github.com/willviles/ember-scrollmagic.git`
* `cd ember-scrollmagic`
* `npm install`
* `ember serve`
* Visit the dummy app at [http://localhost:4200](http://localhost:4200).
