---
title: Animated
order: 0
---

<span class="codelink">
[&rarr; addon/components/animated-item.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/components/animated-item.js)
</span>

The `scrollmagic-animated` component can have a name of an animation passed to it, along with all `ScrollMagic.Scene` options. For example:

```hbs
{{scrollmagic-animated
  animation="fade"
  duration="100%"
  offset=100
  triggerElement=triggerElement
  triggerHook="onCenter"
  loglevel=3
  indicators=true
  reverse=false
}}
```
