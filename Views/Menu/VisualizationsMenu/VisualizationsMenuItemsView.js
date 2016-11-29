Application.VisualizationMenuItemsView = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-items',
  initialize: function() {
    var _this = this;
    this.itemViews = [];

    this.collection.forEach(function(model) {
      _this.itemViews.push(new Application.VisualizationMenuItemView({ model: model }));
    });

    this.listenTo(this.collection, 'change:chosen', this.onChosenChanged);

  },
  onChosenChanged: function(model) {
    if (model.get('chosen') === false) return;

    if (this.currentModelChanged === undefined) {
      this.setModelCurrent(model);
      return;
    }

    if (this.currentModelChanged.get('chosen') === true) this.currentModelChanged.set('chosen', false);

    this.setModelCurrent(model);
  },
  setModelCurrent: function(model) {
    this.currentModelChanged = model;
  },
  render: function() {
    var _this = this;

    this.itemViews.forEach(function(itemView) {
      _this.$el.append(itemView.render().el);
    });

    return this;
  }
});


Application.VisualizationMenuItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-item',
  template: _.template(
    ['<div class="visualizations-list-item-thumb"><img class="responsiveImg" src="<%= imgUrl %>"></div>',
    '<div class="visualizations-list-item-title"><%= title %></div>'].join('')),
    initialize: function() {
      this.listenTo(this.model, 'change:chosen', this.onChosenChanged);
    },
    events: {
      'click' : 'onClick'
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    onChosenChanged: function() {
      this.$('.visualizations-list-item-thumb').toggleClass('is-clicked');
    },
    onClick: function() {
      this.setChosen();
    },
    setChosen: function() {
      this.model.set('chosen', true);
    }
  });


  Application.VisualizationMenuItemDescriptionView = Backbone.View.extend({
    tagName: 'div',
    className: 'visualizations-list-item-description',
    template: _.template('<p><%= description %></p>'),
    initialize: function() {
      this.listenTo(this.collection, 'change:chosen', this.onChosenChanged);
    },
    events: {
    },
    render: function(model) {
      this.$el.html(this.template(model.attributes));
      return this;
    },
    onChosenChanged: function(model) {
      this.render(model);
    }
  });
