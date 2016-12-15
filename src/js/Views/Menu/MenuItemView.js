var Application = Application || {};

Application.MenuItemView = Backbone.View.extend({

  tag: 'div',

  className: 'menu__item',

  initialize: function() {

  },

  events: {

    'click': 'onClick'

  },

  onClick: function() {

    this.model.set( 'selected', true );

  },

  render: function() {

    this.$el.append( this.model.get( 'displayName' ) );

    return this;

  }

});
