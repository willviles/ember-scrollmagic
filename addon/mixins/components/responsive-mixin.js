import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { computed, get, getProperties } from '@ember/object';
import { addObserver, removeObserver } from '@ember/object/observers';
import { isPresent, typeOf } from '@ember/utils';

export default Mixin.create({

  media: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:media');
  }),

  willRender() {
    this._super(...arguments);
    this.setResponsiveSceneHandlers();
  },

  setResponsiveSceneHandlers() {
    let {
      media,
      triggerOnMedia
    } = getProperties(this, 'media', 'triggerOnMedia');

    if (!media || !triggerOnMedia) { return; }
    addObserver(media, 'matches.[]', this, 'onResponsiveSizeChange');
  },

  onResponsiveSizeChange() {
    this.setOrRemoveScene();
  },

  isActiveMediaQuery() {
    let media = get(this, 'media'),
        triggerOnMedia = get(this, 'triggerOnMedia');

    if (!media || !triggerOnMedia) { return true; }

    if (typeOf(triggerOnMedia) === 'string') {
      triggerOnMedia = A([triggerOnMedia]);
    }

    if (typeOf(triggerOnMedia) !== 'array') { return true; }

    let matches = get(media, 'matches'),
        match = triggerOnMedia.find(media => {
          return matches.includes(media);
        });

    return isPresent(match);
  },

  willDestroyElement() {
    this._super(...arguments);
    removeObserver(this, 'media.matches.[]', this, 'onResponsiveSizeChange');
  }

});
