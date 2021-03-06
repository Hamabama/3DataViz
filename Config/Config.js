var Application = Application || {};

/**
 * Application object(namespace), which wraps entire application.
 * Application can has:
 * - configuration
 * - file to be loaded
 * - etc.
 * @return null
 */
Application = {

    //Create Route which handles Views and Models
    init: function() {
        this.rootRouter = new this.RootRouter();
        Backbone.history.start();
        $('#startScreen').remove();
    },
    models: {
        name: 'model',
        map: { /*twitterDB: 'Tweets from DB', twitterLive: 'Twitter Live',*/ csv: 'Local File', box: 'BOX', spreadSheet:'Google SpreadSheet', googleTrends: 'Google Trends'},
        spreadSheet: {
            url: ['Models/SpreadSheetGlobeModel.js'],
            attributes: true,
            templates: ['points', 'countries', 'graph']
        },
        googleTrends: {
            url: ['Models/GoogleTrendsGlobeModel.js'],
            attributes: false,
            templates: ['countries']
        },
        twitterDB: {
            url: ['Models/TwitterDBModel.js'],
            attributes: false,
            templates: ['dynamic']
        },
        twitterLive: {
            url: ['Models/TwitterLiveModel.js'],
            attributes: false,
            templates: ['dynamic']
        },
        csv: {
            url: ['Models/CSVGlobeModel.js'],
            attributes: true,
            templates: ['points', 'countries', 'graph']
        },
        box: {
            url: ['Models/BoxGlobeModel.js'],
            attributes: true,
            templates: ['points', 'countries', 'graph']
        },
        json: {
            url: ['Models/JSONmodel.js'],
            attributes: true,
            templates: ['points', 'countries', 'graph']
        }
    },

    templates: {
        name: 'template',
        map: { countries: 'regional', points: 'location', dynamic: 'realtime', graph: 'relationship', pointcloud: 'pointcloud' },  // internal name / display name
        countries: {
            url: ['Views/Layers/CountriesLayer.js'],
            attributes: {
                default: ['country', 'value', 'category', 'date'],
                optional: ['category', 'countrycode', 'label']
            },
            filters: ['country'],
            decorator: 'geometry',
        },
        points: {
            url: ['Views/Layers/PointsLayer.js'],
            attributes: {
                default: ['latitude', 'longitude', 'label', 'value', 'category', 'date'],
                optional: ['label', 'value', 'category']
            },
            filters: [],
            decorator: 'geometry',
        },
        dynamic: {
            url: ['Views/Layers/DynamicLayer.js', 'Views/Layers/DynamicLayerParticle.js'],
            attributes: {
                default: ['latitude', 'longitude', 'date'],
                optional: ['value', 'category']
            },
            filters: [],
            decorator: 'geometry',
        },
        graph: {
            url: ['Views/Layers/GraphsLayer.js'],
            attributes: {
                default: ['label_from', 'latitude_from', 'longitude_from',  'label_to', 'latitude_to', 'longitude_to', 'value', 'category', 'date'],
                optional: ['timestamp', 'value', 'category']
            },
            filters: [],
            decorator: 'geometry',
        },
        pointcloud: {
          	url: ['Views/Layers/PointCloudLayer.js'],
              attributes: {
          	    default: ['x','y','z','value','category', 'date'],
                optional: ['value','category']
              },
          	filters: [],
            decorator: ''
        }
    },
    userConfig: {
        model: '',
        decorator: '',
        files: '',
        template: '',
        input: '',
        interval: '',
        timeFrom: '',
        timeTo: '',
        fileInfo: {},
        timelineAvailable: false
    }

};
