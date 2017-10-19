import Mixin from '@ember/object/mixin';

import propertyClassNameBinding from 'dummy/utils/property-class-name-binding';

export default Mixin.create({

  classNameBindings: ['_depth', '_depthHover'],

  depth: false,
  _depth: propertyClassNameBinding('depth'),

  depthHover: false,
  _depthHover: propertyClassNameBinding('depthHover')

});
