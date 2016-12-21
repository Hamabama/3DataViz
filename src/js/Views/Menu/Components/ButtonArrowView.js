var Application = Application || {};

Application.ButtonArrowView = Backbone.View.extend({

  tagName: 'div',

  initialize: function() {

    this.render();

  },

  events: {

    'click': 'onClick'

  },

  template: _.template( '<span></span><span></span>' ),

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  onClick: function() {

    this.trigger( 'menu:next' );

  },

  show: function() {

  this.$el.removeClass( 'off-screen' );

  },

  hide: function() {

  this.$el.addClass( 'off-screen' );

  }

});
