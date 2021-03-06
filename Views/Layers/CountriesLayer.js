var Application = Application || {};

Application.CountriesLayer = Application.BaseGlobeView.extend({

  // framework methods
  initialize: function(decorator, collections) {

    Application.BaseGlobeView.prototype.initialize.call(this, decorator, collections);

    this.added = []; // list of countries participating and their old colors
    this.old = [] ; // holds added countries from the previos call

  },
  render: function() {

    Application.BaseGlobeView.prototype.render.call(this);
    return this;
  },
  clickOn: function(event) {

    var intersectedMesh = Application.BaseGlobeView.prototype.clickOn.call(this, event);

    var found = false;
    var sign = '';

    if (Application.userConfig.model == 'googleTrends') sign = '%';

    if (intersectedMesh) {

      $.each(this.added, function(index, country) {

        if (intersectedMesh.object == country.mesh) {
          Application._vent.trigger('vizinfocenter/message/on', country.mesh.userData.name[0] +
          '<br>' + Application.Helper.formatNumber(country.value) + sign );
          found = true;
        }
      });
    }
  },
  destroy: function() {
    Application.BaseGlobeView.prototype.destroy.call(this);

    this.colors = null;

    $.each(this.added, function(index, country) {
      country.mesh = null;
      country.color = null;
      country = null;
    });

    this.added = null;
    this.old = null;
  },
  suscribe: function() {
    Application.BaseGlobeView.prototype.suscribe.call(this);
  },
  processRequest: function() {

    this.collection[0].fetch();

  },
  reset: function() {
    Application.BaseGlobeView.prototype.reset.call(this);
    //this.resetGlobe();
  },
  resetGlobe: function() {

    var that = this;

    $.each(that.added, function(index, country) {

      country.mesh.material.color.setHex(country.color);

    });

    that.added.length = 0;

  },
  getColor: function(cur, min, max) {
    var x = cur - min || 0;
    var y = max - min || 0;
    var value = x / y;

    return this.percentToRGB(value*100);

  },
  percentToRGB:  function(percent) {
    if (percent === 100) {
      percent = 99
    }
    var r, g, b;
    //
    // if (percent < 50) {
    //     // green to yellow
    //     r = Math.floor(255 * (percent / 50));
    //     g = 255;
    //
    // } else {
    // yellow to red
    r = 255;
    g = Math.floor(255 * ((100 - percent) / 100));
    //console.log(percent);
    // }
    b = 0;
    // return "rgb(" + r + "," + g + "," + b + ")";
    return { r: (r/255), g: (g/255), b: (b/255) }
  },
  createColors: function(results) {

    var that = this;
    var colors = {};

    var min = Math.log10(Math.log10(results[0].value));
    var max = Math.log10(Math.log10(results[results.length - 1].value));

    if(!isFinite(min) || min < 0){
      min = 0;
    }

    if (Application.userConfig.model == 'googleTrends') {
      min = 0;
      max = 100;
    }

    var uniques = _.chain(results).map(function(item) {
      return item.value;
    }).uniq().value();

    $.each(uniques, function(index, number) {

      var num = number;

      if (Application.userConfig.model !== 'googleTrends') var num = Math.log10(Math.log10(num));
      if(!isFinite(num) || num < 0){
        num = 0;
      }

      colors[number] = that.getColor(num, min, max);

    });

    return colors;
  },
  getAllResults: function() {

  Application.BaseGlobeView.prototype.getAllResults.call(this);

    var results = this.collection[0].models;
  //  this.getCategories(results);
     this.showResults(results);
  },
  showResults: function(results) {
    Application._vent.trigger('controlpanel/message/off');

    var that = this;

    Application.BaseGlobeView.prototype.showResults.call(this, results);

    if (results.length == 0) {
      Application._vent.trigger('controlpanel/message/on', 'NO DATA RECIEVED');
      return;
    }

    if (results[0].value !== 'undefined') {
      results.sort(function(a, b) { // sorts array in ascending order by value
        return a.value - b.value
      });
    }

    var colorsMap = this.createColors(results); // creates a colors map relative to the values

    $.each(results, function(index, item) {

      var countrymesh = that.decorators[0].findCountry(item.country);

      if (!countrymesh) {
        // console.log('Country ' + (item.countrycode || item.countryname) + ' is not available ');
        return;
      }

      var obj = {};
      obj.mesh = countrymesh;
      obj.color = countrymesh.material.color.getHex();
      if (item.value) obj.value = item.value;

      if (item.category) obj.category = item.category;

      if (item.value) that.tweenit(countrymesh, colorsMap[item.value], that.getit, 2);

      obj.result_color = countrymesh.material.color.getHex();

      that.added.push(obj);

    });

  },
  getit: function(countrymesh, tweenObj) {

    countrymesh.material.color.setRGB(tweenObj.r, tweenObj.g, tweenObj.b);
  },
  tweenit: function(mesh, end, receive, seconds) {

    Application.BaseGlobeView.prototype.tweenit.call(this, mesh, end, receive, seconds);

  },
  sortResultsByCategory: function() {

    var that = this;

    Application.BaseGlobeView.prototype.sortResultsByCategory.call(this);

    this.showAllResults();

    if (this.activeCategories.length != 0) {
      $.each(this.added, function(index, country) { // turn all added countries grey

        country.mesh.material.color.r = 0.5;
        country.mesh.material.color.g = 0.5;
        country.mesh.material.color.b = 0.5;

      });
    }

    $.each(this.activeCategories, function(i, category) {

      $.each(that.added, function(i, country) {

        if (country.category == category) {

          country.mesh.material.color.setHex(country.result_color);

        }

      });

    });

  },
  showAllResults: function() {

    Application.BaseGlobeView.prototype.showAllResults.call(this);

    this.resetGlobe();

    $.each(this.added, function(index, country) {

      country.mesh.material.color.setHex(country.result_color);

    });
  },

});
