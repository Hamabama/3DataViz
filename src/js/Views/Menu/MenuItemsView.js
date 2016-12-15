var Application = Application || {};

Application.MenuItemsView = Backbone.View.extend({

  tag: 'div',

  className: 'menu__items',

  initialize: function() {

    var _this = this;
    this.itemsVisible = false;
    this.subViews = [];
    this.menuModel = this.model;

    //this.collection.reset();

    this.menuItemsCollection = this.collection;

    this.menuItemsCollection.each( function( itemModel ) {

      _this.subViews.push( new Application.MenuItemView({ model: itemModel }));

    });

    this.listenTo( this.menuItemsCollection, 'change:selected', this.onItemSelected );

  },

  render: function() {

    var _this = this;

    var fragment = document.createDocumentFragment();

    _.each( this.subViews, function( subView ) {

      $( fragment ).append( subView.render().el );

    });

      _this.$el.append( fragment );

    return this;

  },

  show: function() {

     this.$el.addClass( 'menu__items--show' );
  },

  hide: function() {

    this.$el.removeClass( 'menu__items--show' );

  },

  toggle: function() {

    if ( this.itemsVisible ) this.hide();
    else                     this.show();

    this.itemsVisible = !this.itemsVisible;

  },

  onItemSelected: function( model ) {

  this.menuModel.set( 'next', model.get( 'viewName' ));

  }
});
