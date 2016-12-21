var Application = Application || {};

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
