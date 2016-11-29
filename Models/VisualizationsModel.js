Application.VisualizationModel = Backbone.Model.extend({
  defaults: {
    title: '',
    imgUrl: '',
    description: '',
    dataSources: [],
    chosen: false
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
    description: 'Show data per country',
    dataSources: ['csv', 'box', 'spreadSheet', 'googleTrends']
  }),
  new Application.VisualizationModel({
    title: 'Locational',
    visualization: 'points',
    imgUrl: 'Assets/images/examples/earthquakes.png',
    description: 'Shows data by points',
    dataSources: ['csv', 'box', 'spreadSheet', 'googleTrends']
  }),
  new Application.VisualizationModel({
    title: 'PointsChart',
    visualization: 'pointcloud',
    imgUrl: 'Assets/images/examples/currencies.png',
    description: 'Shows data by charts',
    dataSources: ['csv', 'box', 'spreadSheet', 'googleTrends']
  })


]);
