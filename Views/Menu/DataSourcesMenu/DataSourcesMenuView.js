Application.DataSourcesMenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'datasources-menu-view',

  initialize: function() {

    this.menuModel = this.model;
    this.dataSourcesCollection = this.collection;

    this.dataSourcesMenuItemsView = new Application.DataSourcesMenuItemsView({

      collection: this.dataSourcesCollection, model: this.menuModel

    });

    this.dataSourcesMenuItemDescriptionView = new Application.DataSourcesMenuItemDescriptionView({

      collection: this.dataSourcesCollection

    });

    this.listenTo( this.dataSourcesCollection, 'change:selected', this.onSelectedChanged );

  },

  template: _.template( '<div class="datasources-list-menu-intro"><h2>Pick a data source:</h2></div>' ),

  render: function() {

    this.$el.html( this.template );

    this.$el.append( this.dataSourcesMenuItemsView.render().el );

    this.$el.append( this.dataSourcesMenuItemDescriptionView.empty().el );

    this.setDataSourcesMenuCurrent();

    return this;

  },

  show: function() {

    this.render();

  },

  setDataSourcesMenuCurrent: function() {

    this.menuModel.set( 'childMenu', '' );

    this.menuModel.set( 'parentMenu', 'visualization' );

    this.menuModel.set( 'currentMenu', 'dataSources' );

  },

  onSelectedChanged: function( model ) {

    var id = model.get( 'id' );

    var next = this.menuModel.get( 'dataSources' )[ id ];

    if ( next === 'map' ) {

      this.menuModel.set( 'childMenu', 'map' );

      this.menuModel.set( 'configurationCompleted', false );
}

    if ( next === 'query' ) {

      this.menuModel.set( 'configurationCompleted', true );

      this.menuModel.set( 'childMenu', '' );

    }

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
