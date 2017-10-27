---
title: Components
order: 1
---

#### component-controller-mixin

<span class="codelink">
[&rarr; addon/mixins/component-controller-mixin.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/mixins/component-controller-mixin.js)
</span>

It's also possible to register scroll controllers on individual components, which will ensure the scroll is scoped to that particular element's scroll position.

The `component-controller-mixin` registers a `ScrollMagic.Controller` instance on `willRender` and removes it on `willDestroyElement`.

```javascript
import Route from '@ember/routing/route';
import ScrollControllerMixin from 'ember-scrollmagic/mixins/component-controller-mixin';

export default Route.extend(
  ScrollControllerMixin, {

});
```

Now, attaching scenes to the scroll controller simply requires using the component's `elementId`.
