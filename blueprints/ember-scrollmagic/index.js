module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addBowerPackageToProject("scrollmagic", "~2.0.5");
  }
};
