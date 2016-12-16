var Application = Application || {};

Application.DemoItemView = Backbone.View.extend({

  tagName: 'div',

  className: 'demo__item',

  initialize: function() {

    this.render();
    
  },

  template: _.template( '<a href="<%= href %>"><img class="responsiveImg" src="<%= imgUrl %>" alt=""></a>' ),

  render: function() {

    this.$el.append( this.template( this.model.attributes ) );

    return this;

  },


});
