var Application = Application || {};

Application.AttributesMenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'attributes-menu-view',

  initialize: function() {

    this.attributesModel = this.model[ 0 ];
    this.menuModel       = this.model[ 1 ];

  },

  template: _.template( '<div class="attributes-list-menu-intro"><p>Match the attributes:</p></div>' ),

  render: function() {

    this.$el.html( this.template );

    this.setAttributesMenuCurrent();

  },

  show: function() {

    this.render();

  },

  setAttributesMenuCurrent: function() {

    this.menuModel.set( 'childMenu', '' );

    this.menuModel.set( 'parentMenu', 'dataSources' );

    this.menuModel.set( 'currentMenu', 'attributes' );

  },

  detach: function() {

    this.$el.detach();

  },

  remove: function() {

    Backbone.View.prototype.remove.call( this );

  }

});
