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
    },

    //Files which need to be imported for GlobeVisualization
    files: [
        [
            'DataProcessor/DataProcessor.js',
            'Views/GlobeDecorators/BaseGlobeDecorator.js',
        ],
        [
            'Helpers/Debug.js',
            'Helpers/DataStructures.js',
            'DataProcessor/ParserFactory.js',
            'DataProcessor/TransformerFactory.js',
            'Events/events.js',
            'Libraries/OrbitControls.js',
            'Libraries/stats.js',
            'Libraries/tween.min.js',
            'Libraries/map3d.js',
            'Libraries/papaparse.js',

            'Routes/RootRouter.js',
            'Views/GlobeDecorators/GeometryGlobeDecorator.js',
            'Views/GlobeDecorators/TextureGlobeDecorator.js',
            'Views/GlobeDecorators/GlobeDecoratorFactory.js',

            'Views/ControlPanel/ControlPanelGlobeView.js',
            'Views/ControlPanel/ControlElementsGlobeView.js',

            'Views/BaseClasses/RootView.js',
            'Views/BaseClasses/RootGlobeView.js',
            'Views/BaseClasses/BaseGlobeView.js',

            'Models/BaseClasses/BaseGlobeModel.js',
        ]
    ],

    models: {
        spreadSheet: ['Models/SpreadSheetGlobeModel.js'],
        googleTrends: ['Models/GoogleTrendsGlobeModel.js'],
        twitterDB: ['Models/TwitterDBModel.js'],
        twitterLive: ['Models/TwitterLiveModel.js'],
        csv: ['Models/FlightPathGlobeModel.js','Models/data/path.js', 'Models/data/countriesList.js']
    },

    layers: {
        points: ['Views/Layers/PointsLayer.js'],
        countries: ['Views/Layers/CountriesLayer.js'],
        dynamic: ['Views/Layers/DynamicLayer.js', 'Views/Layers/DynamicLayerParticle.js'],
        graph: ['Views/Layers/GraphsLayer.js']

    }

}
require(['Helpers/Helper.js'], function(){
    Application.Helper.requireOrderly(Application.files, function(){
        Application.init();
    });
});