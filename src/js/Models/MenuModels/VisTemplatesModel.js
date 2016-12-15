Application.VisTemplatesModel = Backbone.Model.extend({

  defaults: {

    currentMenu: '',

    parentMenu: '',

    childMenu: '',

    configurationCompleted: false,

    visualization: '',

    visualizations: {

      'countries': {

        dataSources: [ 'spreadSheet', 'googleTrends', 'file', 'box' ],

        attributes: {

          mandatory: [ 'country', 'value', 'category', 'date' ],

          optional: [ 'category', 'countrycode', 'label' ]

        }

      },

      'points': {

        dataSources: [ 'spreadSheet', 'file', 'box' ],

        attributes: {

          mandatory: [ 'latitude', 'longitude', 'label', 'value', 'category', 'date' ],

          optional: [ 'label', 'value', 'category' ]

        }

      },

      'pointcloud': {

        dataSources: [ 'spreadSheet', 'file', 'box' ],

        attributes: {

          mandatory: [ 'x', 'y', 'z', 'value', 'category', 'date' ],

          optional: [ 'value', 'category' ]

        }

      }

    },

    dataSources: {

      'spreadSheet': 'map',
      'file': 'map',
      'box': 'map',
      'googleTrends': 'query',

    }

  },

  getDataSources: function( visualization ) {

    return this.visualizations.get( visualization ).dataSources;

  },

  getAttributes: function( visualization ) {

    return this.visualizations.get( visualization ).attributes;

  },

  getDataFormat: function( dataSource ) {

    return this.dataSources.get( dataSource );

  }


});


Application.visTemplatesModel = new Application.VisTemplatesModel();
