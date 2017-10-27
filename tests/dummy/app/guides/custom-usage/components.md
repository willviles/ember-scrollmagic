---
title: Custom Components
order: 1
---

#### Custom Components

Ember ScrollMagic offers a `component-scene-mixin`, which prescribes a method of organizing component animations, exposes scene events as actions and adds and removes the scene to/from the scroll controller using the appropriate component lifecycle hooks.

```javascript
import Component from '@ember/component';
import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/component-scene-mixin';

export default Component.extend(
  ScrollMagicComponentMixin, {

  setupScene() {
    let opts = get(this, 'mergedOptions'),
        scene = new ScrollMagic.Scene(opts);

    // Whatever you want to do with the scene

    return scene;
  }

});
```
