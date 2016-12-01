Application.MenuControlsView = Backbone.View.extend({
  tag: 'div',
  className: 'menu-controls',
  initialize: function() {
    this.nextButton = new Application.MenuControlsViewNextButton();
    this.backButton = new Application.MenuControlsViewBackButton();

    this.listenTo(this.nextButton.$el, 'click', this.onClickNextButton);
    this.listenTo(this.backButton.$el, 'click', this.onClickBackButton);
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
    'click': 'onClick'
  },
  render: function() {
    return this;
  },
  onClick: function() {
    this.trigger('menu:next');
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
    'click': 'onClick'
  },
  render: function() {
    return this;
  },
  onClick: function() {
    this.trigger('menu:back');
  },
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  }
});
