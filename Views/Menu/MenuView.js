Application.MenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'menu-frame',
  initialize: function() {
    this.closeButtonView = new Application.CloseButtonView();
    this.listenTo(this.closeButtonView, 'menu:close', this.hideMenu);

    this.menuControlsView = new Application.MenuControlsView();
    this.listenTo(this.menuControlsView, 'menu:next', this.onMenuNext);
    this.listenTo(this.menuControlsView, 'menu:back', this.onMenuBack);

    this.visualizationsMenuView = new Application.VisualizationsMenuView({
      collection: Application.visualizationsCollection
    });
    this.listenTo(this.visualizationsMenuView, 'configuration:completed', this.onConfigurationCompleted);

    this.dataSourcesMenuView = new Application.DataSourcesMenuView({
      collection: Application.visualizationsCollection
    });

  },
  events: {
  },
  render: function() {
    this.$el.append(this.closeButtonView.render().el);
    // this.$el.append(this.visualizationsMenuView.render().el);
    this.$el.append(this.dataSourcesMenuView.render().el);
    this.$el.append(this.menuControlsView.render().el);
    return this;
  },
  showMenu: function () {
    this.$el.fadeIn(100);
  },
  hideMenu: function() {
    this.$el.fadeOut(100);
  },
  createVisualizationsView: function() {
    if (this.visualizationsMenuView) this.visualizationsMenuView.remove();
    this.visualizationsMenuView = new Application.VisualizationsView({
      collection: Application.visualizationsCollection
    });
  },
  onConfigurationCompleted: function() {
    this.menuControlsView.showNextButton();
  },
  onMenuNext: function() {},
  onMenuBack: function() {}
});
