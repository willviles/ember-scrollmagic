### Fullscreen Section Example

Pinned page sections can be created by setting `pushFollowers=true` inside the `pinOptions` hash. You can also give the pin spacer a custom class name.

```hbs
{{#scrollmagic-pinned
  duration="125%"
  pinOptions=(hash
    pushFollowers=true
    spacerClass='custom-pin-spacer-class'
  )}}
  <span>Content</span>
{{/scrollmagic-pinned}}
```

This will ensure any inline content following the section will be pushed down for the duration of the pin. The example below pins for 125% of the viewport height.
