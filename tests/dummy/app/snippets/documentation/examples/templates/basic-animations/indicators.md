### Indicators

Add generated indicators by defining `indicators=true`.

```handlebars
{{#scrollmagic-animated indicators=true}}
  <span>Your content</span>
{{/scrollmagic-animated}}
```

Or add custom indicators by passing a hash.

```handlebars
{{#scrollmagic-animated
  indicators=(hash
    name='Check out these indicators!'
    colorStart='#1682fc'
    colorEnd='#1682fc'
    colorTrigger='transparent'
  )}}
  <span>Your content</span>
{{/scrollmagic-animated}}
```
