var Application = Application || {};

Application.GoogleTrendsRecord = Application.BaseDataRecord.extend({

    defaults: _.extend({}, Application.BaseDataRecord.prototype.defaults, {

    }),
    initialize: function() {
        Application.BaseDataRecord.prototype.initialize.call(this);
    }

});

Application.GoogleTrendsCollection = Application.BaseGlobeCollection.extend({
    model: Application.GoogleTrendsRecord,
    initialize: function(_vent) {
        Application.BaseGlobeCollection.prototype.initialize.call(this);

        this._vent = _vent;
        this.response; // response from google trends
        var that = this;

        window.google = {
                visualization: {

                    Query: {

                        setResponse: function(data) {

                            that.parse(data);
                        }
                    }
                }
            }
            // this._vent.on('trends/changed', this.parse.bind(this));
    },
    parse: function(response) {

        var pModule = Application.DataProcessor.ProcessorModule;
        var options = {

            dataType: "googleTrends"
        };
        var pData = pModule.processData(response.table.rows, options)
            // return pData;

        this._vent.trigger('trends/parsed', pData);
    },
    setURL: function(key) {

        if (!key) return;
        this.url = 'http://www.google.com/trends/fetchComponent?q=' + key + '&cid=GEO_TABLE_0_0&export=3';
    },
    request: function() {

        var that = this;

        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", this.url);
        document.getElementsByTagName("head")[0].appendChild(fileref);

    }
});