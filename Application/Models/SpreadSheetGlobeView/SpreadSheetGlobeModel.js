var Application = Application || {};

Application.SpreadSheetRecord = Application.GeoDataRecord.extend({

    defaults: _.extend({}, Application.GeoDataRecord.prototype.defaults, {

    }),
    initialize: function(_vent) {
        Application.GeoDataRecord.prototype.initialize.call(this);
        this._vent = _vent;
    }

});

Application.SpreadSheetCollection = Application.BaseGlobeCollection.extend({
    model: Application.SpreadSheetRecord,
    initialize: function() {

        Application.BaseGlobeCollection.prototype.initialize.call(this);
    },
    parse: function(response) {

        // console.log(response);
        var pModule = Application.DataProcessor.ProcessorModule;
        
        var options = {

            dataType: "spreadSheet"
        };
        
        var pData = pModule.processData(response, options);
        
        return pData;
    },

    setURL: function(key) {

        if (!key) return;
        this.url = 'https://spreadsheets.google.com/feeds/cells/' + key + '/1/public/basic?alt=json';
    }
});