Application.MenuModel = Backbone.Model.extend({
  defaults: {
    current: 'visualization',
    next: '',
    previous: '',
    visualization: '',
    dataSources: [],
    dataSource: '',
    map: '',
    query: ''
  }
});

Application.menuModel = new Application.MenuModel();
