Application.MenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu',

  initialize: function() {

    this.menuModel = this.model;

    this.$el.on( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', this.onTransitionEnd.bind( this ) );

    this.showMainMenuView();

    this.listenTo( this.menuModel, 'change:next', this.onNextChanged );

  },

  render: function( view ) {

    this.$el.html( view.render().el );

    return this;

  },

  openMenu: function() {

    this.$el.addClass( 'menu--drop' );

  },

  closeMenu: function() {

    this.$el.removeClass( 'menu--drop' );

  },

  onTransitionEnd: function( e ) {

    if ( event.target === event.currentTarget ) {

      this.currentView.toggle();

    }

  },

    showView: function( viewName ) {

      this.removeCurrentView();

      switch( viewName ) {

        case 'main':

        this.showMainMenuView();

        return;

        case 'demos':

        this.showDemosMenu();

        return;

      }

    },

    removeCurrentView: function( view ) {

      if ( this.currentView ) this.currentView.remove();

    },

    showMainMenuView: function() {

      this.currentView = new Application.MenuItemsView( { collection: Application.menuItemsCollection, model: this.menuModel } );

      this.render( this.currentView );

    },

    showDemosMenu: function() {

      this.currentView = new Application.DemosMenuView( { model: this.menuModel } );

      this.render( this.currentView );

    },

    onNextChanged: function( model ) {

      this.showView( model.changed.next );

    }

  });
