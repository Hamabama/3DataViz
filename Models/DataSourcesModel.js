Application.DataSourceModel = Backbone.Model.extend({
  defaults: {
    title: '',
    name: '',
    imgUrl: '',
    description: '',
    chosen: false
  }
});

Application.DataSourcesCollection = Backbone.Collection.extend({
  model: Application.DataSourceModel
});

Application.dataSourcesCollection = new Application.DataSourcesCollection([
  new Application.DataSourceModel({
    title: 'Local file',
    name: 'csv',
    imgUrl: '',
    description: 'Supply your own dataset from your device. File formats supported are TXT and CSV'
  }),
  new Application.DataSourceModel({
    title: 'BOX',
    name: 'box',
    imgUrl: '',
    description: 'Supply your own dataset from the BOX cloud storage. File formats supported are TXT and CSV'
  }),
  new Application.DataSourceModel({
    title: 'Google SpreadSheet',
    name: 'spreadSheet',
    imgUrl: '',
    description: 'Supply your own dataset using Google SpreadSheet.'
  }),
  new Application.DataSourceModel({
    title: 'Google Trends',
    name: 'googleTrends',
    imgUrl: '',
    description: 'Make a query to Google trends'
  })
]);
