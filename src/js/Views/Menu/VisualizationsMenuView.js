Application.VisualizationsMenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu-visualizations',

  initialize: function() {

    this.menuModel = this.model;

    this.menuItemsView = new Application.MenuItemsView({ model: this.menuModel });

    this.listenTo( this.menuModel, 'change:childMenu', this.onChildMenuChanged );
    this.listenTo( this.menuModel, 'change:parentMenu', this.onParentMenuChanged );
    this.listenTo( this.menuModel, 'change:configurationCompleted', this.onConfigurationCompletedChanged );

    this.nextButton = new Application.MenuControlsViewNextButton();
    this.listenTo( this.nextButton, 'menu:next', this.onMenuNext );

    this.backButton = new Application.MenuControlsViewBackButton();
    this.listenTo( this.backButton, 'menu:back', this.onMenuBack );

    this.visualizeButton = new Application.MenuControlsVisualizeButton();
    this.listenTo( this.visualizeButton, 'menu:visualize', this.onMenuVisualize );

  },

  template: _.template( '<div class="menu-controls"></div>' ),

  render: function() {

    this.$el.append( this.menuItemsView.render().el );

    this.$el.append( this.template );

    this.$( '.menu-controls' ).append( this.nextButton.render().el );

    this.$( '.menu-controls' ).append( this.backButton.render().el );

    this.$( '.menu-controls' ).append( this.visualizeButton.render().el );

    return this;

  },

  showMenu: function() {

    // this.$el.fadeIn( 100 );
    this.$el.addClass('drop-menu');

  },

  hideMenu: function() {

    // this.$el.fadeOut( 100 );
    this.$el.removeClass('drop-menu');

  },

  onMenuNext: function() {

    this.menuItemsView.getNextMenu();

  },

  onMenuBack: function() {

    this.menuItemsView.getPreviousMenu();

  },

  onMenuVisualize: function() {

    console.log('fire!!!');

  },

  onChildMenuChanged: function(model) {

    if (model.changed.childMenu !== '') this.nextButton.show();
    if (model.changed.childMenu === '') this.nextButton.hide();

  },

  onParentMenuChanged: function(model) {

    if (model.changed.parentMenu !== '') this.backButton.show();
    if (model.changed.parentMenu === '') this.backButton.hide();

  },

  onConfigurationCompletedChanged: function(model) {

    if (model.changed.configurationCompleted === true) this.visualizeButton.show();
    if (model.changed.configurationCompleted === false) this.visualizeButton.hide();

  }

});
