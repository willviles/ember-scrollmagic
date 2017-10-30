import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { computed, get, getProperties } from '@ember/object';
import { addObserver, removeObserver } from '@ember/object/observers';
import { isPresent } from '@ember/utils';

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
      triggerMediaQuery
    } = getProperties(this, 'media', 'triggerMediaQuery');

    if (!media || !triggerMediaQuery) { return; }
    addObserver(media, 'matches.[]', this, 'onResponsiveSizeChange');
  },

  onResponsiveSizeChange() {
    this.setOrRemoveScene();
  },

  isActiveMediaQuery() {
    let media = get(this, 'media'),
        triggerMediaQuery = get(this, 'triggerMediaQuery');

    if (!media || !triggerMediaQuery) { return true; }

    let matches = get(media, 'matches'),
        match = triggerMediaQuery.find(media => {
          return matches.includes(media);
        });

    return isPresent(match);
  },

  willDestroyElement() {
    this._super(...arguments);
    removeObserver(this, 'media.matches.[]', this, 'onResponsiveSizeChange');
  }

});
