---
title: Components
order: 1
---

#### Component Mixin

<span class="codelink">
[&rarr; addon/mixins/scroll-controllers/component-mixin.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/mixins/scroll-controllers/component-mixin.js)
</span>

It's also possible to register scroll controllers on individual components, which will ensure the scroll is scoped to that particular element's scroll position.

The mixin registers a `ScrollMagic.Controller` instance on `willRender` and removes it on `willDestroyElement`. It sets the property `scrollController` to the newly created `ScrollMagic.Controller` instance, which can then be used to register scenes.

```javascript
import Route from '@ember/routing/route';
import ScrollControllerComponentMixin from 'ember-scrollmagic/mixins/scroll-controllers/component-mixin';

export default Route.extend(
  ScrollControllerComponentMixin, {

  registerScenes() {
    let scrollController = get(this, 'scrollController');
    // ...
  }
});
```
