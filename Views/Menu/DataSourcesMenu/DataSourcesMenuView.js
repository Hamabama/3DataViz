Application.DataSourcesMenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'datasources-list-menu',

  initialize: function() {

    this.dataSourcesMenuIntroView = new Application.DataSourcesMenuIntroView();

    this.dataSourcesMenuItemsView = new Application.DataSourcesMenuItemsView({

      collection: this.collection

    });

    this.dataSourcesMenuItemDescriptionView = new Application.DataSourcesMenuItemDescriptionView({

      collection: this.collection

    });

    this.listenTo( this.collection, 'change:selected', this.onChosenChanged );

    this.render();

  },

  render: function() {

    this.$el.append( this.dataSourcesMenuIntroView.render().el );

    this.$el.append( this.dataSourcesMenuItemsView.render().el );

    this.$el.append( this.dataSourcesMenuItemDescriptionView.el );

    return this;

  },

  onChosenChanged: function() {

    this.trigger( 'configuration:completed' );

  },

  detach: function() {

    this.$el.detach();

  },

  remove: function() {

    this.dataSourcesMenuIntroView.remove();

    this.dataSourcesMenuItemsView.remove();

    this.dataSourcesMenuItemDescriptionView.remove();

    Backbone.View.prototype.remove.call( this );

  }

});

Application.DataSourcesMenuIntroView = Backbone.View.extend({

  tagName: 'div',

  className: 'datasources-list-menu-intro',

  initialize: function() {
  },

  render: function() {

    this.$el.append( '<p>Pick a data source:</p>' );

    return this;

  }

});
