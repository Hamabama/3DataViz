Application.VisualizationsMenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'visualizations-menu-view',

  initialize: function() {

    this.menuModel = this.model;
    this.visualizationsCollection = this.collection;

    this.visualizationMenuItemsView = new Application.VisualizationMenuItemsView({

      collection: this.visualizationsCollection, model: this.menuModel

    });

    this.visualizationMenuItemDescriptionView = new Application.VisualizationMenuItemDescriptionView({

      collection: this.visualizationsCollection

    });

    this.listenTo( this.visualizationsCollection, 'change:selected', this.onVisualizationSelected );

  },

  template: _.template( '<div class="visualizations-list-menu-intro"><h2>Pick a visualization template:</h2></div>' ),

  render: function() {

    this.$el.html( this.template );

    this.$el.append( this.visualizationMenuItemsView.render().el );

    this.$el.append( this.visualizationMenuItemDescriptionView.el );

    this.setVisualizationMenuCurrent();

    return this;

  },

  show: function() {

    this.visualizationMenuItemDescriptionView.empty();

    this.setVisualizationMenuCurrent();

    return this;

  },

  setVisualizationMenuCurrent: function() {

    this.menuModel.set( 'parentMenu', '' );

    this.menuModel.set( 'currentMenu', 'visualization' );

    this.menuModel.set( 'configurationCompleted', false );

  },

  onVisualizationSelected: function() {

    this.model.set( 'childMenu', 'dataSources' );

  },

  detach: function() {

    this.$el.detach();

  },

  remove: function() {

    this.visualizationMenuIntroView.remove();

    this.visualizationMenuItemsView.remove();

    this.visualizationMenuItemDescriptionView.remove();

    Backbone.View.prototype.remove.call( this );

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
