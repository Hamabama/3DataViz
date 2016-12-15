/* this view is the holder for views: visualization, datasource, attributes */

var Application = Application || {};

Application.VisualizationTemplatesItemsView = Backbone.View.extend({

  className: 'menu-items-view',

  initialize: function() {

    this.menuModel = this.model;

    this.visualizationsMenuView = new Application.VisualizationsMenuView({

      collection: Application.visualizationsCollection, model: this.menuModel

    });

    this.dataSourcesMenuView = new Application.DataSourcesMenuView({

      collection: Application.dataSourcesCollection, model: this.menuModel

    });

    this.attributesMenuView = new Application.AttributesMenuView({

      model: [ Application.attributesModel, this.menuModel ]

    });


  },

  render: function() {

    this.$el.append( this.visualizationsMenuView.render().el );

    this.currentView = this.visualizationsMenuView;

    return this;

  },

  detachCurrentView: function() {

    if ( this.currentView ) this.currentView.detach();

  },

  renderNextView: function( view ) {

    this.detachCurrentView();

    this.$el.html( view.el );

    view.show();

    this.currentView = view;

  },

  getNextMenu: function() {

    if ( this.menuModel.get( 'currentMenu' ) == 'visualization' ) {

      this.renderNextView( this.dataSourcesMenuView );

      return;

    }

    if ( this.menuModel.get( 'currentMenu' ) == 'dataSources' ) {

      this.renderNextView( this.attributesMenuView );

      return;

    }

  },

  getPreviousMenu: function() {

    if ( this.menuModel.get( 'currentMenu' ) == 'dataSources' ) this.renderNextView( this.visualizationsMenuView );

    if ( this.menuModel.get( 'currentMenu' ) == 'attributes' ) this.renderNextView( this.dataSourcesMenuView );

  }

});
