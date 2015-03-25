Application = Application || {};
// Data Record

Application.BaseDataRecord = Backbone.Model.extend({
	initialize: function(options) {
	}
});

Application.GeoDataRecord = Application.BaseDataRecord.extend({
	defaults: {
		longitude: 0,
		latitude: 0,
		city: ""
	},
	initialize: function(options) {
		Application.BaseDataRecord.prototype.initialize.call(this, options);
	}
});

Application.PopulationGeoDataRecord = Application.GeoDataRecord.extend({
	defaults: {
		population: 0,
	},
	initialize: function(options) {
		Application.GeoDataRecord.prototype.initialize.call(this, options);
	},
	test: function(){
		console.log("test!!");
	}
});

// Data Records Collection

Application.PopulationGeoDataRecords = Backbone.Collection.extend({
	model: Application.PopulationGeoDataRecord,
	url: "#",
	initialize: function(options) {
	}
});

// Model

Application.BaseGlobeModel = Backbone.Model.extend({
	initialize: function(options) {
	},
	loadData: function() {
	}
});

Application.GlobeModel = Application.BaseGlobeModel.extend({
	initialize: function(options) {
		BaseGlobeModel.prototype.initialize.call(this, options);
	},
  	loadData: function() {
	  	var rawData = [{
	  				city: "Montreal",
				    population: 3268513,
				    latitude: 45.509,
				    longitude: -73.558
				},
				{   city: "Toronto",
				    population: 2600000,
				    latitude: 43.7,
				    longitude: -79.416
				},
				{   city: "Vancouver",
				    population: 1837969,
				    latitude: 49.25,
				    longitude: -123.119
				},
				{   city: "Calgary",
				    population: 1019942,
				    latitude: 51.05,
				    longitude: -114.085
				},
				{   city: "Ottawa",
				    population: 812129,
				    latitude: 45.411,
				    longitude: -75.698
				},
				{   city: "Edmonton",
				    population: 712391,
				    latitude: 53.55,
				    longitude: -113.469
				},
				{   city: "Mississauga",
				    population: 668549,
				    latitude: 43.579,
				    longitude: -79.658
				},
				{   city: "North York",
				    population: 636000,
				    latitude: 43.676,
				    longitude: -79.416
				},
				{   city: "Winnipeg",
				    population: 632063,
				    latitude: 49.884,
				    longitude: -97.147
				},
				{   city: "Scarborough",
				    population: 600000,
				    latitude: 43.772,
				    longitude: -79.257
				}];

		var populationGeoDataRecords = new Application.PopulationGeoDataRecords(rawData);
	  	// var populationGeoDataRecords = new PopulationGeoDataRecords();
	  	// for (var index = 0; index < rawData.length; ++index) {
	  	// 	// do some preprocessing if needed

	  	// 	var populationGeoDataRecord = new PopulationGeoDataRecord(rawData[index])
	  	// 	populationGeoDataRecords.add(populationGeoDataRecord);
	  	// }
		return populationGeoDataRecords;
  	}
});
