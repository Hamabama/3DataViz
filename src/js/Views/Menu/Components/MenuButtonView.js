Application.MenuButtonView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu__button',

  initialize: function() {

    this.menuButton = $( '<div class="menu__button__icon">' +
    '<span></span><span></span><span></span>' +
    ' </div>' );

    this.isOpen = false;

  },

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.menuButton );

    return this;

  },

  onClick: function() {

    if ( this.isOpen ) this.trigger( 'menu:close' );

    else               this.trigger( 'menu:open' );

    this.isOpen = !this.isOpen;
    this.menuButton.toggleClass('open');

  }

});
