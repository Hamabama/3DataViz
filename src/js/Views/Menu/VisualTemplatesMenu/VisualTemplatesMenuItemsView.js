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
