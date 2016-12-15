Application.MenuRootView = Backbone.View.extend({
  tagName: 'div',
  className: 'menu-root-view',
  initialize: function() {

    this.menuButtonView = new Application.MenuButtonView();
    this.menuView = new Application.MenuView({ model: Application.menuModel });

    this.listenTo(this.menuButtonView, 'menu:open', this.onMenuOpen);
    this.listenTo(this.menuButtonView, 'menu:close', this.onMenuClose);

    this.visualizationsView = null;
    this.timelineShown = false; // reflects the state of timeline button

    //this.dataSourcesView = new Application.DataSourcesView();
    //this.matcher = new Application.Matcher();


    Application._vent.on('data/parsed', this.addTemplatesView, this);

    Application._vent.on('matcher/on', this.destroyViews, this);
    Application._vent.on('controlpanel/input/changed', this.destroyViews, this);
    Application._vent.on('controlpanel/subview/model', this.destroyViews, this);
    Application._vent.on('controlpanel/subview/remove', this.destroyViews, this);
    Application._vent.on('controlpanel/menu/clear', this.clearDataSourceMenu, this);

    Application._vent.on('filters/on', this.addFiltersView, this);
    Application._vent.on('controlpanel/subview/model', this.changeLocation, this);
    //Application._vent.on('matcher/submit', this.addFiltersView, this);
    Application._vent.on('timeline/ready', this.addTimelineView, this);
    Application._vent.on('matcher/submit', this.addCameraSwitcherView, this);

    this.helpButton = new Application.Help();
    this.helpButton.$el.attr('id', 'helpButton');

    this.feedback = new Application.FeedBack();
    this.feedback.$el.attr('id', 'feedbackButton');

    this.$el.append(this.helpButton.render().$el);
    this.$el.append(this.feedback.render().$el);

  },
  render: function() {
    //this.$el.append(this.dataSourcesView.render().$el);
    //this.$el.append(this.matcher.render().$el);

    this.$el.append(this.menuButtonView.render().$el);
    this.$el.append(this.menuView.$el);

    return this;
  },

  onMenuOpen: function() {

   this.menuView.openMenu();

  },
  onMenuClose: function() {

   this.menuView.closeMenu();

  },

  changeLocation: function() {
    window.location = '#view';
  },
  addTimelineView: function(dates) {

    if (this.timeline) this.timeline.destroy();
    this.addTimelineButton();
    this.timeline = new Application.Timeline(dates);
    this.$el.append(this.timeline.$el);
    this.timeline.update();
  },
  addTimelineButton: function() {

      if (this.timelineButton) this.timelineContainer.remove();

      this.timelineButton = new Application.Button();
      this.timelineButton.$el.text('TIMELINE');
      this.timelineButton.$el.on('mousedown', this.timelineButtonAction.bind(this));

      this.timelineContainer = $('<div class="configList"></div>');
      this.timelineContainer.append(this.timelineButton.render().$el);
      this.$el.append(this.timelineContainer);

  },
  timelineButtonAction: function() {

    if (this.timeline) {

      if (!this.timelineShown) {
        this.timeline.$el.show();
        Application._vent.trigger('timeline/on');

      } else {
        this.timeline.$el.hide();
        Application._vent.trigger('data/ready');
      }
      this.timelineShown = !this.timelineShown;
    } else {
      Application._vent.trigger('timeline/on');
      this.timelineShown = true;
    }
  },
  addFiltersView: function() {

    if (this.filtersView) this.filtersView.destroy();

    //if (!Application.attrsMap['category']) return;

    this.filtersView = new Application.FiltersView();
    this.$el.append(this.filtersView.render().$el);
    //this.filterPanel.$el.hide();

  },
  addCameraSwitcherView: function() {

    // console.log(this.cameraSwitcherView);

    if (this.cameraSwitcherView){
      this.cameraSwitcherView.destroy();
    }

    this.cameraSwitcherView = new Application.CameraSwitcherView();
    this.$el.append(this.cameraSwitcherView.render().$el);
    this.cameraSwitcherView.$el.hide();
  },
  addDataSourcesView: function() {
    if (this.dataSourcesView) this.dataSourcesView.destroy();
    this.dataSourcesView = new Application.DataSourcesView();
  },
  addTemplatesView: function() {

    var viewConfig = this.getTemplatesMap();

    if (this.visualizationsView) this.visualizationsView.destroy();
    this.visualizationsView = new Application.VisualizationsView(viewConfig);
    this.$el.append(this.visualizationsView.render().$el);

  },
  getTemplatesMap: function() {

    var config = {};
    var list = Application.models[Application.userConfig.model].templates;
    var map = {};

    $.each(list, function(i, internalName) {

      map[internalName] = Application.templates.map[internalName];

    });
    config.name = Application.templates.name;
    config.map = map;

    return config;
  },
  destroyViews: function() {
    this.destroyTemplatesView();
    this.destroyCategoriesView();
    this.destroyFilters();
    this.destroyTimeline();
    this.destroyCameraSwitch();
  },
  destroyDataSourceSubView: function() {

    if (this.dataSourcesView.subview)  this.dataSourcesView.subview.destroy();
  },
  destroyCameraSwitch: function() {
    if (this.cameraSwitcherView) {
      this.cameraSwitcherView.destroy();
      this.cameraSwitcherView = null;
    }
  },
  destroyFilters: function() {
    if (this.filtersView) {
      this.filtersView.destroy();
      this.filtersView = null;
    }
  },
  destroyTimeline: function() {
    if (this.timeline) {
      this.timeline.destroy();
      this.timeline = null;
    }

    if (this.timelineButton) {
      this.timelineButton.destroy();
      this.timelineButton = null;
      this.timelineContainer.remove();
      this.timelineContainer = null;
    }

    Application.userConfig.timelineAvailable = false;
  },
  destroyCategoriesView: function() {

    if (this.categoriesView) {
      this.categoriesView.destroy();
      this.categoriesView = null;
    }

  },
  destroyTemplatesView: function() {

    if (this.visualizationsView) {

      this.visualizationsView.destroy();
      this.visualizationsView = null;
    }

  },
  clearDataSourceMenu: function() {

    if (this.dataSourcesView != null) {
      this.dataSourcesView.clear();
    }

  },
  reset: function() {
    Application._vent.on('data/parsed', this.addTemplatesView, this);
    if (this.visualizationsView != null) {
      this.visualizationsView.destroy();
      this.visualizationsView = null;
    }
    if (this.dataSourcesView.subview != null) {
      this.dataSourcesView.subview.destroy();
      this.dataSourcesView.subview = null;
    }
    this.dataSourcesView.$el.children()[0].selectedIndex = 0;
  },
  destroy: function() {}
});

Application.NotificationsCenter = Backbone.View.extend({
  tagName: 'div',
  id: 'notificationsBox',
  initialize: function() {
    Application._vent.on('controlpanel/message/on', this.showMessage, this);
    Application._vent.on('controlpanel/message/off', this.removeMessage, this);
    // Application._vent.on('data/ready', this.removeMessage, this);
    this.$el.hide();
  },
  render: function() {

    return this;
  },
  showMessage: function(message) {
    // console.log("showMessage", message);
    this.$el.fadeIn();
    this.$el.empty();
    this.$el.append('<div class="notification">' + message + '</div>');
  },
  removeMessage: function() {
    this.$el.empty();
    this.$el.fadeOut();
  },
  destroy: function() {
    Application._vent.unbind('controlpanel/message/on');
    Application._vent.unbind('controlpanel/message/off');
  }
});
