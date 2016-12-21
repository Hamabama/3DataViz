var Application = Application || {};

Application.ItemDescriptionView = Backbone.View.extend({

  tagName: 'div',

  className: 'item__description',

  template: _.template( '<p><%= description %></p>' ),

  initialize: function() {

    this.listenTo( this.collection, 'change:selected', this.onSelectedChanged );

  },

  empty: function() {

    this.$el.empty();

    this.$el.removeClass( 'item__description--show' );

    return this;

  },

  render: function( model ) {

    this.$el.html( this.template( model.attributes ) );

    this.$el.addClass( 'item__description--show' );

    return this;

  },

  onSelectedChanged: function( model ) {

    this.render( model );

  }

});
