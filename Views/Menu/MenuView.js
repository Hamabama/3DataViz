Application.MenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'menu-frame',
  initialize: function() {
    this.closeButtonView = new Application.CloseButtonView();
    this.listenTo(this.closeButtonView, 'menu:close', this.hideMenu);

    this.menuItemsView = new Application.MenuItemsView({ model: this.model });
    this.listenTo(this.model, 'change:next', this.onNextChanged);
    this.listenTo(this.model, 'change:previous', this.onPreviousChanged);

    this.nextButton = new Application.MenuControlsViewNextButton();
    this.backButton = new Application.MenuControlsViewBackButton();
    this.listenTo(this.nextButton, 'menu:next', this.onMenuNext);
    this.listenTo(this.backButton, 'menu:back', this.onMenuBack);
  },
  template: _.template('<div class="menu-controls"></div>'),
  events: {
  },
  render: function() {
    this.$el.append(this.menuItemsView.render().el);
    this.$el.append(this.template);
    this.$el.append(this.closeButtonView.render().el);

    this.$('.menu-controls').append(this.nextButton.render().el);
    this.$('.menu-controls').append(this.backButton.render().el);
    return this;
  },
  showMenu: function () {
    this.$el.fadeIn(100);
  },
  hideMenu: function() {
    this.$el.fadeOut(100);
  },
  onMenuNext: function() {
    this.menuItemsView.getNextMenu();
  },
  onMenuBack: function() {
    this.menuItemsView.getPreviousMenu();
  },
  onNextChanged: function() {
    this.nextButton.show();
  },
  onPreviousChanged: function() {
    this.backButton.show();
  },
});
