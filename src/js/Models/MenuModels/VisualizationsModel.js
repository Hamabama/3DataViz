Application.VisualizationModel = Backbone.Model.extend({

  defaults: {

    title: '',
    id: '',
    imgUrl: '',
    description: '',
    selected: false

  }

});

Application.VisualizationsCollection = Backbone.Collection.extend({

  model: Application.VisualizationModel

});

Application.visualizationsCollection = new Application.VisualizationsCollection([

  new Application.VisualizationModel({

    title: 'Regional',
    id: 'countries',
    imgUrl: 'Assets/images/examples/immigration.png',
    description: 'Show data per country. Attributes supported: country, value, category, date, label',

  }),

  new Application.VisualizationModel({

    title: 'Locational',
    id: 'points',
    imgUrl: 'Assets/images/examples/earthquakes.png',
    description: 'Shows data by points. Attributes supported: location, value, title',

  }),

  new Application.VisualizationModel({

    title: 'PointsChart',
    id: 'pointcloud',
    imgUrl: 'Assets/images/examples/currencies.png',
    description: 'Shows data by charts. Attributes supported: x, y, z, value, category, date',

  })

]);
