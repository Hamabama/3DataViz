Application.MenuControlsView = Backbone.View.extend({
  tag: 'div',
  className: 'menu-controls',
  initialize: function() {
    this.nextButton = new Application.MenuControlsViewNextButton();
    this.backButton = new Application.MenuControlsViewBackButton();

    this.listenTo(this.nextButton, 'click', this.onClickNextButton);
    this.listenTo(this.backButton, 'click', this.onClickBackButton);
  },
  render: function() {
    this.$el.append(this.nextButton.render().el);
    this.$el.append(this.backButton.render().el);
    return this;
  },
  showNextButton: function() {
    this.nextButton.show();
  },
  hideNextButton: function() {
    this.nextButton.hide();
  },
  showBackButton: function() {
    this.backButton.show();
  },
  hideBackButton: function() {
    this.backButton.hide();
  },
  onClickNextButton: function() {
    this.trigger('menu:next');
  },
  onClickBackButton: function() {
    this.trigger('menu:back');
  }
});

Application.MenuControlsViewNextButton = Backbone.View.extend({
  tag: 'div',
  className: 'menu-controls-next',
  initialize: function() {
  },
  events: {
  },
  render: function() {
    return this;
  },
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  }
});

Application.MenuControlsViewBackButton = Backbone.View.extend({
  tag: 'div',
  className: 'menu-controls-back',
  initialize: function() {
  },
  events: {
    'click': 'onClickBackButton'
  },
  render: function() {
    return this;
  },
  onClickBackButton: function() {
    this.trigger('menu:back');
  },
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  }
});
