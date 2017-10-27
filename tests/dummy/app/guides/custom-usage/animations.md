---
title: Animation Timelines
order: 0
---

Extend the Ember ScrollMagic `animated-item` component and override the `timeline` function with your custom timeline. The example below shows how a simple fade timeline is defined.

```javascript
import ScrollMagicAnimatedItem from 'ember-scrollmagic/components/animated-item';

export default ScrollMagicAnimatedItem.extend({

  timeline() {
    return new TimelineMax().add(
      TweenLite.fromTo(this.element, 1, {
        opacity: 0
      }, {
        opacity: 1
      })
    );
  }

});
```
