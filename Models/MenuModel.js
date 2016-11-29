Application.MenuModel = Backbone.Model.extend({
  defaults: {
    visualization: {
      type: '',
      configured: false,
    },
    dataSource: {
      type: '',
      configured: false,
    },
    data: {
      type: '',
      configured: false
    }
  }
});
