import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';

let definitions = [{
  title: 'Basic Animations',
  description: `Build beautiful on-scroll animations using just HTMLbars templates. Fade, fly, zoom and toggle classes using Ember ScrollMagic's components.`
}, {
  title: 'Custom Animations',
  description: `Create complex, custom animations using GSAP timelines and attach them via Ember ScrollMagic's well defined primitives.`
}, {
  title: 'Pinned Items',
  description: `Use Ember ScrollMagic's out-of-the-box pin component to create 'sticky' sections which stay fixed throughout your page. Perfect for navigation menus!`
}, {
  title: 'Parallax Sections',
  description: 'Coming soon...'
}, {
  title: 'Section Wipes',
  description: 'Coming soon...'
}, {
  title: 'Section Slides',
  description: 'Coming soon...'
}, {
  title: 'Component Scrolling',
  description: 'Coming soon...'
}, {
  title: 'Horizontal Scrolling',
  description: 'Coming soon...'
}];

export const examples = definitions.map(example => {
  return assign({}, example, {
    slug: dasherize(example.title)
  });
})

export default examples;
