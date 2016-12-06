Application.VisualizationMenuItemsView = Backbone.View.extend({

  tagName: 'div',

  className: 'visualizations-list-items',

  initialize: function() {

    var _this = this;
    this.itemViews = [];
    this.menuModel = this.model;
    this.visCollection = this.collection;

    this.visCollection.forEach(function(visModel) {

      _this.itemViews.push(new Application.VisualizationMenuItemView({ model: visModel }));

    });

    this.listenTo( this.visCollection, 'change:selected', this.onSelectedChanged );

  },

  onSelectedChanged: function( visModel ) {

    if ( visModel.get( 'selected' ) === false ) return;

    this.setVisualizationCurrent( visModel );

    if ( this.currentModelChanged !== undefined ) {

    if ( this.currentModelChanged.get( 'selected' ) === true ) this.currentModelChanged.set( 'selected', false );

  }
    this.setModelCurrent( visModel );

  },

  setVisualizationCurrent: function( visModel ) {

    this.menuModel.set( 'visualization', visModel.get( 'id' ));

  },

  setModelCurrent: function( model ) {

    this.currentModelChanged = model;

  },

  render: function() {

    var _this = this;

    this.itemViews.forEach(function( itemView ) {

      _this.$el.append( itemView.render().el );

    });

    return this;

  },

  remove: function() {

    this.itemViews.forEach(function( view ) {

      view.remove();

    });

    Backbone.View.prototype.remove.call( this );

  }

});


Application.VisualizationMenuItemView = Backbone.View.extend({

  tagName: 'div',

  className: 'visualizations-list-item',

  template: _.template(
    ['<div class="visualizations-list-item-thumb"><img class="responsiveImg" src="<%= imgUrl %>"></div>',
    '<div class="visualizations-list-item-title"><%= title %></div>'].join( '' ) ),

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

      this.$( '.visualizations-list-item-thumb' ).toggleClass( 'is-selected' );

    },

    onClick: function() {

      this.setSelected();

    },

    setSelected: function() {

      this.model.set( 'selected', true );

    }

  });


  Application.VisualizationMenuItemDescriptionView = Backbone.View.extend({

    tagName: 'div',

    className: 'visualizations-list-item-description',

    template: _.template( '<p><%= description %></p>' ),

    initialize: function() {

      this.listenTo( this.collection, 'change:selected', this.onSelectedChanged );

    },

    empty: function() {

      this.$el.empty();

      return this;

    },

    render: function( model ) {

      this.$el.html( this.template( model.attributes ) );

      return this;

    },

    onSelectedChanged: function( model ) {

      this.render( model );

    }

  });
