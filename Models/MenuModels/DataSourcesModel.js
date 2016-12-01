Application.DataSourceModel = Backbone.Model.extend({
  defaults: {
    title: '',
    name: '',
    imgUrl: '',
    description: '',
    attributes: false,
    selected: false
  }
});

Application.DataSourcesCollection = Backbone.Collection.extend({
  model: Application.DataSourceModel
});

Application.dataSourcesCollection = new Application.DataSourcesCollection([
  new Application.DataSourceModel({
    title: 'Local file',
    name: 'csv',
    imgUrl: 'Assets/images/datasources/pc.png',
    description: 'Supply your own dataset from your device. File formats supported are TXT and CSV.',
    attributes: true
  }),
  new Application.DataSourceModel({
    title: 'BOX',
    name: 'box',
    imgUrl: 'Assets/images/datasources/box.png',
    description: 'Supply your own dataset from the BOX cloud storage. File formats supported are TXT and CSV.',
    attributes: true
  }),
  new Application.DataSourceModel({
    title: 'Google SpreadSheet',
    name: 'spreadSheet',
    imgUrl: 'Assets/images/datasources/gsheet.png',
    description: 'Supply your own dataset using Google SpreadSheet.',
    attributes: true
  }),
  new Application.DataSourceModel({
    title: 'Google Trends',
    name: 'googleTrends',
    imgUrl: 'Assets/images/datasources/gtrends.png',
    description: 'Make a query to Google Trends.',
    attributes: false
  })
]);
