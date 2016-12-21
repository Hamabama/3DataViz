var Application = Application || {};

Application.DemoItemView = Backbone.View.extend({

  tagName: 'div',

  initialize: function() {

    this.listenTo( this.model, 'change:selected', this.onSelectedChanged );

    this.render();

  },

  events: {

    'click': 'onClick'

  },

  template: _.template( '<img class="responsiveImg" src="<%= imgUrl %>" alt="">' ),

  render: function() {

    this.$el.append( this.template( this.model.attributes ) );

    return this;

  },

  onClick: function() {

    this.select();

  },

  onSelectedChanged: function( model ) {

    if ( model.changed[ 'selected' ] === true ) this.$el.addClass( 'item--selected' );

    else                                        this.$el.removeClass( 'item--selected' );

  },

  select: function() {

    this.model.set( 'selected', true );

  },

  unselect: function() {

    this.model.set( 'selected', false );

  }

});
