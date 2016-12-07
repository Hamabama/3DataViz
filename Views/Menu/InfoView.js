Application.InfoView = Backbone.View.extend({
  tagName:'div',
  className: 'info-frame',
  initialize: function() {
    var that = this;
    $.get('Templates/info.html', function(data) {
      template = _.template(data, {});
      that.$el.html(template);
      $('.application-frame').prepend(that.$el);
    }, 'html');
  },
  render: function() {}
});
