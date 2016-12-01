var Application = Application || {};

Application.MenuItemsView = Backbone.View.extend({
  className: 'menu-items-frame',

  initialize: function() {

    this.menuModel = this.model;

    this.visualizationsMenuView = new Application.VisualizationsMenuView({

      collection: Application.visualizationsCollection, model: this.menuModel

    });

    this.dataSourcesMenuView = new Application.DataSourcesMenuView({

      collection: Application.dataSourcesCollection, model: this.menuModel

    });

    this.renderNextView(this.visualizationsMenuView);

  },

  render: function() {

    return this;

  },

  detachCurrentView: function() {

    if ( this.currentView ) this.currentView.detach();

  },

  renderNextView: function( view ) {

    this.detachCurrentView();

    this.$el.html( view.el );

    this.currentView = view;

  },

  getNextMenu: function() {

    var next = this.menuModel.get( 'next' );

    if ( next == 'dataSources' ) this.renderNextView( this.dataSourcesMenuView );

  },

  getPreviousMenu: function() {

    var next = this.menuModel.get( 'previous' );

    if ( next == 'visualization' ) this.renderNextView( this.visualizationsMenuView );

  }

});
