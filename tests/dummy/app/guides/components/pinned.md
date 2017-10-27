---
title: Pinned
order: 1
---

<span class="codelink">
[&rarr; addon/components/pinned-item.js](https://github.com/willviles/ember-scrollmagic/blob/master/addon/components/pinned-item.js)
</span>

The `scrollmagic-pinned` component simply requires a duration passed to it. It accepts all other `ScrollMagic.Scene` options too. By default, the pin pushes all following elements.

```hbs
{{#scrollmagic-pinned duration="100%"}}
  <span>Pinned and pushes content down!</span>
{{/scrollmagic-pinned}}
```

To disable the ScrollMagic `pushFollowers` value, simply pass `pinOptions` to the component. You can also alter the `spacerClass` value:

```hbs

{{#scrollmagic-pinned
  duration=0
  pinOptions=(hash
    pushFollowers=false
    spacerClass=".custom-spacer-class"
  )}}
  <span>Pinned and overlays content!</span>
{{/scrollmagic-pinned}}
```
