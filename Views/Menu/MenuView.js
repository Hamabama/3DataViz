Application.MenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'menu-frame',
  initialize: function() {
    this.closeButtonView = new Application.CloseButtonView();
    this.listenTo(this.closeButtonView, 'menu:close', this.hide);

    this.visualizationsMenuList = new Application.VisualizationsView({
      collection: Application.visualizationsCollection
    });

    this.menuControlsView = new Application.MenuControlsView();
  },
  events: {
    'click': 'hideMenu'
  },
  render: function() {
    this.$el.append(this.closeButtonView.render().el);
    this.$el.append(this.visualizationsMenuList.render().el);
    this.$el.append(this.menuControlsView.render().el);
    return this;
  },
  show: function () {
    this.$el.fadeIn(100);
  },
  hide: function() {
    this.$el.fadeOut(100);
  },
  destroy: function() {
    this.stopListening();
  }
});
