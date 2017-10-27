---
title: Application
order: 0
---

#### application-controller-mixin

<span class="codelink">
[&rarr; addon/mixins/application-controller-mixin.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/mixins/application-controller-mixin.js)
</span>

By default, Ember ScrollMagic will register all ScrollMagic scenes to a scroll controller named `application`.

It needs to be registered in your `routes/application.js`:

```javascript
import Route from '@ember/routing/route';
import ScrollControllerMixin from 'ember-scrollmagic/mixins/application-controller-mixin';

export default Route.extend(
  ScrollControllerMixin, {

});
```

Now, all scenes without a custom scroll controller attached to them will register and deregister from the application scroll controller.
