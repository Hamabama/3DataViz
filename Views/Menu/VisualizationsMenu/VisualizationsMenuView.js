Application.VisualizationsMenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-menu',

  initialize: function() {
    this.visualizationMenuIntroView = new Application.VisualizationsMenuIntroView();
    this.visualizationMenuItemsView = new Application.VisualizationMenuItemsView({
      collection: this.collection
    });

    this.visualizationMenuItemDescriptionView = new Application.VisualizationMenuItemDescriptionView({
      collection: this.collection
    });

    this.listenTo(this.collection, 'change:chosen', this.onChosenChanged);

  },
  render: function() {
    this.$el.append(this.visualizationMenuIntroView.render().el);
    this.$el.append(this.visualizationMenuItemsView.render().el);
    this.$el.append(this.visualizationMenuItemDescriptionView.el);
    return this;
  },
  onChosenChanged: function() {
    this.trigger('configuration:completed');
  }
});

Application.VisualizationsMenuIntroView = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-list-menu-intro',

  initialize: function() {
  },
  render: function() {
    this.$el.append('<p>Pick a visualization template:</p>');
    return this;
  }
});




//
// Application._VisualizationsView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'configList',
//   initialize: function(config) {
//
//     this.subview = null;
//     this.visualizebtn = null;
//     this.config = config;
//     Application._vent.on('controlpanel/subview/template', this.addThumbnail, this);
//     this.getSubView();
//   },
//   render: function() {
//
//     return this;
//   },
//   destroy: function() {
//
//     this.remove();
//     this.config = null;
//     this.visualizationList = null;
//     this.subview.destroy();
//     this.subview = null;
//     this.filterButton.destroy();
//     this.filterButton = null;
//
//   },
//   addSubView: function() {
//
//     if (this.subview) {
//       if (this.labelForTemplates) this.labelForTemplates.remove();
//       this.subview.destroy();
//     }
//
//     if (this.visualizebtn) this.visualizebtn.destroy(); // to rework
//     this.subview = this.getSubView();
//     Application._vent.unbind('controlpanel/subview/template', this.addThumbnail);
//   },
//
//   getSubView: function() {
//     var that = this;
//
//     if (Application.models[Application.userConfig.model].attributes == false) {
//       this.subview = new Application.DropDownList(this.config);
//       this.subview.$el.attr('id', 'templatesList');
//       this.labelForTemplates = $('<label for="templatesList" class="label">CHOOSE A TEMPLATE</label>');
//       this.$el.append(this.labelForTemplates);
//
//       this.$el.append(this.subview.render().$el);
//
//       this.visualizebtn = new Application.Button(this.config.map); // to do submit button in elements
//
//       this.visualizebtn.$el.text('VISUALIZE');
//       this.visualizebtn.$el.on('mousedown', this.submitAction.bind(this));
//       this.$el.append(this.visualizebtn.render().$el);
//     }
//
//     return this.subview;
//
//   },
//   submitAction: function(e) {
//     Application._vent.trigger('visualize');
//   },
//   addThumbnail: function(name) {
//     if (this.picDiv) this.picDiv.remove();
//     this.picDiv = $('<div id="pic"></div>');
//     this.pic = $('<img src="Assets/images/templates/' + name + '.png">');
//     this.picDiv.append(this.pic);
//     this.$el.append(this.picDiv);
//   },
//
//
// });
