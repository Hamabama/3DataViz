Application.DataSourcesMenuItemsView = Backbone.View.extend({

  tagName: 'div',

  className: 'datasources-list-items',

  initialize: function() {

    var _this = this;
    this.itemViews = [];
    this.menuModel = this.model;

    this.listenTo( this.collection, 'change:selected', this.onSelectedChanged );

  },

  getSourcesList: function() {

    var selectedVisualization = this.menuModel.get( 'visualization' );

    return this.menuModel.get( 'visualizations' )[ selectedVisualization ].dataSources;

  },

  initSourcesList: function() {

    var _this = this;
    var itemView = {};

    this.emptyViews();

    var sourcesList = this.getSourcesList(this.menuModel);

    _.each(sourcesList, function(item) {

      var model = _this.collection.findWhere({ 'id': item });

      model.attributes[ 'selected' ] = false; // in order to prevent firing a change event

      if (model) itemView = new Application.DataSourcesMenuItemView({ model: model });

      if (itemView) {

        _this.itemViews.push(itemView);

        _this.$el.append( itemView.render().el );

      }
    });

  },

  emptyViews: function() {

    this.itemViews.forEach(function( view ) {

    view.remove();

    });

    this.itemViews.length = 0;

  },

  onSelectedChanged: function( model ) {

    if ( model.get( 'selected' ) === false ) return;

    if ( this.currentModelChanged === undefined ) {

      this.setModelCurrent( model );

      return;
    }

    if ( this.currentModelChanged.get( 'selected' ) === true ) this.currentModelChanged.set( 'selected', false );

    this.setModelCurrent( model );

  },

  setModelCurrent: function( model ) {

    this.currentModelChanged = model;

  },

  render: function() {

    var _this = this;

    this.initSourcesList();

    return this;
  },

  remove: function() {

    this.itemViews.forEach( function( view ) {

      view.remove();

    });

    Backbone.View.prototype.remove.call( this );

  }

});


Application.DataSourcesMenuItemView = Backbone.View.extend({

  tagName: 'div',

  className: 'datasources-list-item',

  template: _.template(
    ['<div class="datasources-list-item-thumb"><img class="responsiveImg" src="<%= imgUrl %>"></div>',
    '<div class="datasources-list-item-title"><%= title %></div>'].join( '' ) ),

    initialize: function() {

      this.listenTo( this.model, 'change:selected', this.onSelectedChanged );

    },

    events: {

      'click' : 'onClick'

    },

    render: function() {

      this.$el.html( this.template( this.model.attributes ) );

      return this;

    },

    onSelectedChanged: function() {

      this.$( '.datasources-list-item-thumb' ).toggleClass( 'is-selected' );

    },

    onClick: function() {

      this.setSelected();

    },

    setSelected: function() {

      this.model.set( 'selected', true );

    }

  });


  Application.DataSourcesMenuItemDescriptionView = Backbone.View.extend({

    tagName: 'div',

    className: 'datasources-list-item-description',

    template: _.template( '<p><%= description %></p>' ),

    initialize: function() {

      this.listenTo( this.collection, 'change:selected', this.onSelectedChanged );
    },

    render: function( model ) {

      this.$el.html( this.template( model.attributes ) );

      return this;

    },

    empty: function() {

      this.$el.empty();

      return this;

    },

    onSelectedChanged: function( model ) {

      this.render( model );

    }

  });
