var Application = Application || {};

Application.DemoItemsLine = Backbone.View.extend({

  tagName: 'div',

  className: 'demo__items',

  initialize: function() {

    var _this = this;
    this.subViews = [];
    this.currentViewIndex = 0;
    this.currentView;
    
    this.collection.each( function( model ) {

      _this.subViews.push( new Application.DemoItemView( { model: model, className: 'demo__item' } ) );

    } );


    this.render();

  },

  render: function() {

    var _this = this;

    _.each( this.subViews, function( view ) {

      _this.$el.append( view.el );

    } );

    this.showItem( 0 );

    return this;

  },

  showNextItem: function() {

    if ( this.currentViewIndex == this.subViews.length - 1 ) return;

    this.currentViewIndex++;

    if ( this.currentView ) {

      this.currentView.$el.addClass( 'previous' );

      this.currentView.unselect();

    }

    this.currentView = this.subViews[ this.currentViewIndex ];

    this.currentView.$el.addClass( 'current' );

    if ( this.currentViewIndex == this.subViews.length - 1 ) this.trigger( 'demoItemsLine:end' );

  },

  showPreviousItem: function() {

    if ( this.currentViewIndex == 0 ) return;

    this.currentViewIndex--;

    if ( this.currentView ) {

      this.currentView.$el.removeClass( 'current' );

      this.currentView.unselect();

    }

    this.currentView = this.subViews[ this.currentViewIndex ];

    this.currentView.$el.removeClass( 'previous' );

    if ( this.currentViewIndex == 0 ) this.trigger( 'demoItemsLine:start' );

  },

  showItem: function( index ) {

    this.currentView = this.subViews[ index ];

    this.currentView.$el.addClass( 'current' );

  }

});
