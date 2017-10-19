import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';

let definitions = [{
  title: 'Basic Animations',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Isto modo, ne si avia quidem eius nata non esset. Sed ne, dum huic obsequor, vobis molestus sim. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Quorum altera prosunt, nocent altera.'
}, {
  title: 'Custom Animations',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Isto modo, ne si avia quidem eius nata non esset. Sed ne, dum huic obsequor, vobis molestus sim. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Quorum altera prosunt, nocent altera.'
}, {
  title: 'Pinned Items',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eam tum adesse, cum dolor omnis absit; Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Quid ei reliquisti, nisi te, quoquo modo loqueretur, intellegere, quid diceret?'
}, {
  title: 'Parallax Sections',
  description: 'Age sane, inquam. Nam bonum ex quo appellatum sit, nescio, praepositum ex eo credo, quod praeponatur aliis. Eadem nunc mea adversum te oratio est. Est enim effectrix multarum et magnarum voluptatum. Duo Reges: constructio interrete.'
}, {
  title: 'Section Wipes',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eam tum adesse, cum dolor omnis absit; Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Quid ei reliquisti, nisi te, quoquo modo loqueretur, intellegere, quid diceret?'
}, {
  title: 'Section Slides',
  description: 'Age sane, inquam. Nam bonum ex quo appellatum sit, nescio, praepositum ex eo credo, quod praeponatur aliis. Eadem nunc mea adversum te oratio est. Est enim effectrix multarum et magnarum voluptatum. Duo Reges: constructio interrete.'
}, {
  title: 'Component Scrolling',
  description: 'Age sane, inquam. Nam bonum ex quo appellatum sit, nescio, praepositum ex eo credo, quod praeponatur aliis. Eadem nunc mea adversum te oratio est. Est enim effectrix multarum et magnarum voluptatum. Duo Reges: constructio interrete.'
}, {
  title: 'Horizontal Scrolling',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eam tum adesse, cum dolor omnis absit; Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Quid ei reliquisti, nisi te, quoquo modo loqueretur, intellegere, quid diceret?'
}];

export const examples = definitions.map(example => {
  return assign({}, example, {
    slug: dasherize(example.title)
  });
})

export default examples;
