var Application = Application || {};

Application.VisualizeButtonView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu-controls-visualize',

  initialize: function() {

    this.render();
    
  },

  template: _.template('VISUALIZE'),

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  show: function() {

     this.$el.show();

  },

  hide: function() {

    this.$el.hide();

  },

  onClick: function() {

    this.trigger( 'menu:visualize' );

  }

});
