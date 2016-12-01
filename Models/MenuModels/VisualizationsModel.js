Application.VisualizationModel = Backbone.Model.extend({
  defaults: {
    title: '',
    visualization: '',
    imgUrl: '',
    description: '',
    dataSources: [],
    selected: false
  }
});

Application.VisualizationsCollection = Backbone.Collection.extend({
  model: Application.VisualizationModel
});

Application.visualizationsCollection = new Application.VisualizationsCollection([
  new Application.VisualizationModel({
    title: 'Regional',
    visualization: 'countries',
    imgUrl: 'Assets/images/examples/immigration.png',
    description: 'Show data per country. Attributes supported: country, value, title',
    dataSources: ['local', 'box', 'googleSheets', 'googleTrends']
  }),
  new Application.VisualizationModel({
    title: 'Locational',
    visualization: 'points',
    imgUrl: 'Assets/images/examples/earthquakes.png',
    description: 'Shows data by points. Attributes supported: location, value, title',
    dataSources: ['local', 'box', 'googleSheets', 'googleTrends']
  }),
  new Application.VisualizationModel({
    title: 'PointsChart',
    visualization: 'pointcloud',
    imgUrl: 'Assets/images/examples/currencies.png',
    description: 'Shows data by charts. Attributes supported: country, value, title',
    dataSources: ['local', 'box', 'googleSheets', 'googleTrends']
  })


]);
