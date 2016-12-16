Application.MenuButtonView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu__button',

  initialize: function() {

    // this.menuButton = '<svg class="menu-button-icon" viewBox="0 0 50 50"><g>' +
    // '<path d="m 0,5 v 5 h 50 v -5"/>' +
    // '<path d="m 0,20 v 5 h 50 v -5"/>' +
    // '<path d="m 0,35 v 5 h 50 v -5"/>' +
    // '</g></svg>';

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

Application.CloseButtonView = Backbone.View.extend({
  tagName: 'div',
  className: 'close-button-view',
  initialize: function() {
    this.closeButton = '<svg class="menu-button-icon-close" viewBox="0 0 50 50"><g>' +
    '<line x1="0" y1="25" x2="50" y2="25" stroke-width="5" />' +
    '<line x1="25" y1="0" x2="25" y2="50" stroke-width="5" />' +
    '</g></svg>';
  },
  events: {
    'click': 'closeMenu'
  },
  render: function() {
    this.$el.append(this.closeButton);
    return this;
  },
  closeMenu: function() {
    this.trigger('menu:close');
  }
});
