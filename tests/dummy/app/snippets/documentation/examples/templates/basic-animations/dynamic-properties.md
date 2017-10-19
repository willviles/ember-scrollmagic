### Dynamic Properties

All `ScrollMagic.Scene` properties can have dynamic values attached to them. Updating a property will automatically refresh the scene.

```hbs
{{#scrollmagic-animated
  animation='fly-horizontal'
  duration=duration
  triggerHook=triggerHook }}
  <span>Your content</span>
{{/scrollmagic-animated}}
```

Update the `duration` and `triggerHook` values below to see how the spaceship scene is affected in real-time:
