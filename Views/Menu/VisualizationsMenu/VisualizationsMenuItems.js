Application.VisualizationMenuItems = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-items',
  initialize: function() {
    var _this = this;
    this.itemViews = [];

    this.collection.forEach(function(model) {
      _this.itemViews.push(new Application.VisualizationMenuItem({ model: model }));
    });

    this.listenTo(this.collection, 'change:clicked', this.onClickedChanged);

  },
  onClickedChanged: function(model) {
    if (model.get('clicked') === false) return;
    if (this.currentModelChanged === undefined) {
      this.currentModelChanged = model;
      return;
    }
    if (this.currentModelChanged.get('clicked') === true) this.currentModelChanged.set('clicked', false);
    this.currentModelChanged = model;
  },
  render: function() {
    var _this = this;
    this.itemViews.forEach(function(itemView) {
      _this.$el.append(itemView.render().el);
    });
    return this;
  },
  destroy: function() {
    this.stopListening();
  }
});


Application.VisualizationMenuItem = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-item',
  template: _.template(
    ['<div class="visualizations-list-item-thumb"><img class="responsiveImg" src="<%= imgUrl %>"></div>',
    '<div class="visualizations-list-item-title"><%= title %></div>'].join('')),
    initialize: function() {
      this.listenTo(this.model, 'change:clicked', this.onClickedChanged);
    },
    events: {
      'click' : 'onClick'
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    onClickedChanged: function() {
      this.$('.visualizations-list-item-thumb').toggleClass('is-clicked');
    },
    onClick: function() {
      this.model.set('clicked', true);
    },
    destroy: function() {
      this.stopListening();
    }
  });


  Application.VisualizationMenuItemDescription = Backbone.View.extend({
    tagName: 'div',
    className: 'visualizations-list-item-description',
    template: _.template('<p><%= description %></p>'),
    initialize: function() {
      this.listenTo(this.collection, 'change:clicked', this.onClickedChanged);
    },
    events: {
    },
    render: function(model) {
      this.$el.html(this.template(model.attributes));
      return this;
    },
    onClickedChanged: function(model) {
      this.render(model);
    },
    destroy: function() {
      this.stopListening();
    }
  });
