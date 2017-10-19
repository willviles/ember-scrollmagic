---
title: Installation
order: 0
---

ScrollMagic uses [GSAP (Greensock Animation Platform)](https://github.com/greensock/GreenSock-JS) for full animation tweening. Ember ScrollMagic will automatically install [Ember GSAP](https://github.com/willviles/ember-gsap) into your application.

```
ember install ember-scrollmagic
```

#### Configuration

To include the indicator plugin, add the following to your `config/environment.js` file.

```javascript
ENV['ember-scrollmagic'] = {
  indicators: true
};
```
