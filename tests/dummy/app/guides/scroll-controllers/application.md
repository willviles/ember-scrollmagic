---
title: Application
order: 0
---

#### Application Route Mixin

<span class="codelink">
[&rarr; addon/mixins/scroll-controllers/route-mixin.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/mixins/scroll-controllers/route-mixin.js)
</span>

By default, Ember ScrollMagic will register all ScrollMagic scenes to a scroll controller named `application`.

It needs to be registered in your `routes/application.js`:

```javascript
import Route from '@ember/routing/route';
import ScrollControllerRouteMixin from 'ember-scrollmagic/mixins/scroll-controllers/route-mixin';

export default Route.extend(
  ScrollControllerRouteMixin, {

});
```

Now, all scenes without a custom scroll controller attached to them will register and deregister from the application scroll controller.
