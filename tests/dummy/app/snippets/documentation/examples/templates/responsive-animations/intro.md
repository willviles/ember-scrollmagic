Ember ScrollMagic's integration with popular addon [Ember Responsive](https://github.com/freshbooks/ember-responsive) allows animation scenes to be enabled or disabled at different `@media screen` breakpoints.

Firstly, ensure [Ember Responsive](https://github.com/freshbooks/ember-responsive) is installed:

```bash
ember install ember-responsive
```

Then, enabling and disabling scenes is as simple as passing an array of breakpoint keys via the `triggerOnMedia` property.

```handlebars
{{scrollmagic-animated
  animation="fade"
  triggerOnMedia=(array 'desktop')}}
```

Resize the viewport to see the animation below only plays on desktop:
