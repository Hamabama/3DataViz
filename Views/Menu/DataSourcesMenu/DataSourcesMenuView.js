Application.DataSourcesMenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'datasources-list-menu',

  initialize: function() {
    this.dataSourcesMenuViewIntro = new Application.DataSourcesMenuViewIntro();
    // this.visualizationMenuItems = new Application.VisualizationMenuItems({
    //   collection: this.collection
    // });

    // this.visualizationMenuItemDescription = new Application.VisualizationMenuItemDescription({
    //   collection: this.collection
    // });

    this.listenTo(this.collection, 'change:chosen', this.onChosenChanged);

  },
  render: function() {
    this.$el.append(this.dataSourcesMenuViewIntro.render().el);
    // this.$el.append(this.visualizationMenuItems.render().el);
    // this.$el.append(this.visualizationMenuItemDescription.el);
    return this;
  },
  onChosenChanged: function() {
    this.trigger('configuration:completed');
  }
});

Application.DataSourcesMenuViewIntro = Backbone.View.extend({
  tagName: 'div',
  className: 'datasources-list-menu-intro',

  initialize: function() {
  },
  render: function() {
    this.$el.append('<p>Pick a data source:</p>');
    return this;
  }
});
