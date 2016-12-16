var Application = Application || {};

Application.MenuControlsArrowButton = Backbone.View.extend({

  tagName: 'div',

  initialize: function() {

    this.render();
  },

  events: {

    'click': 'onClick'

  },

  template: _.template('<span></span><span></span>'),

  render: function() {

    this.$el.append(this.template);

    return this;

  },

  onClick: function() {

    this.trigger( 'menu:next' );

  },

  show: function() {

  this.$el.removeClass( 'off-screen' );

  },

  hide: function() {

  this.$el.addClass( 'off-screen' );

  }

});

Application.MenuControlsViewNextButton = Backbone.View.extend({
  tag: 'div',

  className: 'menu-controls-next-view',

  initialize: function() {
  },

  template: _.template( '<svg viewBox="0 0 477.175 477.175">' +
   '<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5' +
   ' c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "' +
   '</svg>' ),

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  onClick: function() {

    this.trigger( 'menu:next' );

  },

  show: function() {

  this.$el.addClass( 'animate-next' );

  },

  hide: function() {

  this.$el.removeClass( 'animate-next' );

  }

});

Application.MenuControlsViewBackButton = Backbone.View.extend({
  tag: 'div',
  className: 'menu-controls-back-view',

  initialize: function() {

  },

  template: _.template( '<svg viewBox="0 0 477.175 477.175">' +
   '<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5' +
   ' c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "' +
   '</svg>' ),

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  onClick: function() {

    this.trigger( 'menu:back' );

  },

  show: function() {

  this.$el.addClass( 'animate-back' );

  },

  hide: function() {

  this.$el.removeClass( 'animate-back' );

  }

});

Application.MenuControlsVisualizeButton = Backbone.View.extend({

  tagName: 'div',

  className: 'menu-controls-visualize',

  initialize: function() {},

  template: _.template('VISUALIZE'),

  events: {

    'click': 'onClick'

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  show: function() {

     this.$el.show();

  },

  hide: function() {

    this.$el.hide();

  },

  onClick: function() {

    this.trigger( 'menu:visualize' );

  }

});
