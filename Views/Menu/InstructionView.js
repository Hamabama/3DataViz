Application.InstructionView = Backbone.View.extend({
  tagName:'div',
  className: 'instruction-frame',
  initialize: function() {
    var that = this;
    $.get('Templates/instruction.html', function(data) {
      template = _.template(data, {});
      that.$el.html(template);
      $('.application-frame').prepend(that.$el);
    }, 'html');
  },
  render: function() {}
});
