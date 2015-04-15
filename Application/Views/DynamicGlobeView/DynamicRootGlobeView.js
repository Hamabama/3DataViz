var Application = Application || {};

Application.DynamicRootGlobeView = Application.RootGlobeView.extend({
  initialize: function() {

    Application.RootGlobeView.prototype.initialize.call(this);
    
    var obj = {};
    obj.collection = new Application.Tweets();
    this.globeView = new Application.DynamicGlobeView(obj);
  },
  render: function(options) {

    Application.RootGlobeView.prototype.render.call(this);
    return this;
  }
});

