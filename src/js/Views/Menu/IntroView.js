Application.IntroView = Backbone.View.extend({

  tagName:'div',

  className: 'intro-page',

  initialize: function() {

    $.get( 'src/Templates/info.html', this.processTemplate.bind( this ), 'html' );

  },

  render: function() {

    this.$el.append( this.template );

    return this;

  },

  processTemplate: function( data ) {

    this.template = _.template( data, {} );

    this.render();

  }

});
