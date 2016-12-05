# Ember ScrollMagic

Ember ScrollMagic is an Ember addon for using [ScrollMagic](https://github.com/janpaepke/ScrollMagic) - the javascript library for magical scroll interactions.

## Installation

Before installing ScrollMagic, you must install an animation library to use with it. ScrollMagic supports both [GSAP - Greensock Animation Platform](https://github.com/greensock/GreenSock-JS) and [VelocityJs] (https://github.com/julianshapiro/velocity).

Ember ScrollMagic currently supports just GSAP. Install [Ember GSAP](https://github.com/willviles/ember-gsap) first.

`ember install ember-gsap`

Then, you can install Ember ScrollMagic.

`ember install ember-scrollmagic`

## Usage

### Routes

Ember ScrollMagic handles the creation and destroying of ScrollMagic controllers using a simple route mixin. To pass options to the new ScrollMagic Controller, define the options in an object `scrollMagicController`.

```javascript
import Ember from 'ember';
import scrollMagicMixin from 'ember-scrollmagic/route-mixin';

export default Ember.Route.extend(scrollMagicMixin, {

  // Optional setup
  scrollMagicController: {
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  }

});
```

A controller will have been registered for the route on the scrollMagic service. To attach scenes to it, inject the ScrollMagic service into the component you wish to animate. The following example will animate the component's opacity from 0 to 1 when it is triggered.

```javascript
import Ember from 'ember';
import ScrollMagic from 'scrollmagic';
import { TweenLite } from 'gsap';

const { inject: { service }, get} = Ember;

export default Ember.Component.extend({
  scrollMagic: service(),

  createScene: Ember.on('didInsertElement', function() {

    const scrollController = get(this, 'scrollMagic').getController();

    let scene = new ScrollMagic.Scene({
      triggerElement: this.$()
    });

    scene.setTween(TweenLite.fromTo(this.$(), 1, { opacity: 0, opacity: 1}));

    scrollController.addScene(scene);

  })

});
```

### Components

It is possible to use Ember ScrollMagic inside scrollable components such as overlays and modals. More documentation will be added to detail this implementation pattern soon.

## Using ScrollMagic

Please refer to the [ScrollMagic API](http://scrollmagic.io/docs/index.html) for full documentation. For examples, ideas and inspiration of what to create with ScrollMagic, check out the [examples](http://scrollmagic.io/examples/).
