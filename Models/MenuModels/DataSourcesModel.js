Application.DataSourceModel = Backbone.Model.extend({
  defaults: {
    title: '',
    id: '',
    imgUrl: '',
    description: '',
    selected: false
  }
});

Application.DataSourcesCollection = Backbone.Collection.extend({
  model: Application.DataSourceModel
});

Application.dataSourcesCollection = new Application.DataSourcesCollection([
  new Application.DataSourceModel({
    title: 'Local file',
    id: 'file',
    imgUrl: 'Assets/images/datasources/pc.png',
    description: 'Supply your own dataset from your device. File formats supported are TXT and CSV.'
  }),
  new Application.DataSourceModel({
    title: 'BOX',
    id: 'box',
    imgUrl: 'Assets/images/datasources/box.png',
    description: 'Supply your own dataset from the BOX cloud storage. File formats supported are TXT and CSV.'
  }),
  new Application.DataSourceModel({
    title: 'Google SpreadSheet',
    id: 'spreadSheet',
    imgUrl: 'Assets/images/datasources/gsheet.png',
    description: 'Supply your own dataset using Google SpreadSheet.'
  }),
  new Application.DataSourceModel({
    title: 'Google Trends',
    id: 'googleTrends',
    imgUrl: 'Assets/images/datasources/gtrends.png',
    description: 'Make a query to Google Trends.'
  })
]);
