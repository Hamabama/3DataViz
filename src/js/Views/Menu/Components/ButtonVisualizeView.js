var Application = Application || {};

Application.VisualizeButtonView = Backbone.View.extend({

  tagName: 'div',

  className: 'button__visualize',

  initialize: function() {

    this.render();

  },

  template: _.template( 'VISUALIZE' ),

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  show: function() {

    this.$el.addClass( 'button__visualize--show' );

  },

  hide: function() {

    this.$el.removeClass( 'button__visualize--show' );

  },

  onClick: function() {

    this.trigger( 'menu:visualize' );

  }

});
