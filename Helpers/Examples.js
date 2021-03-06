var Application = Application || {};

Application.Examples = function() {

  var init = function() {

    Application.userConfig.model = 'json';
    return this;

  };

  var Earthquakes = function () {

    this.init = function() {

      Application.attrsMap = { date: "time", latitude: "latitude", longitude: "longitude" };
      Application.userConfig.model = 'json';
      Application.userConfig.template = 'dynamic';
      Application.userConfig.templateTitle = 'Earthquakes';
      Application.userConfig.files = 'SampleData/Location/earthquake.json';
      Application._vent.trigger('controlpanel/subview/remove');
      Application._vent.trigger('controlpanel/menu/clear');
      Application._vent.trigger('controlpanel/parse'); // create collection

    };

    this.destroy = function() {};

  };

  var Immigration = function() {

    this.init = function() {

      Application.attrsMap = {
        country: "Country of citizenship", date: "1980", date2: "1981",
        date3: "1982", date4: "1983", date5: "1984", date6: "1985",
        date7: "1986", date8: "1987", date9: "1988", date10: "1989",
        date11: "1990", date12: "1991", date13: "1992", date14: "1993",
        date15: "1994", date16: "1995", date17: "1996", date18: "1997",
        date19: "1998", date20: "1999", date21: "2000", date22: "2001",
        date23: "2002", date24: "2003", date25: "2004", date26: "2005",
        date27: "2006", date28: "2007", date29: "2008", date30: "2009",
        date31: "2010", date32: "2011", date33: "2012", date34: "2013",
        date35: "2014"
      };
      Application.userConfig.template = 'countries';
      Application.userConfig.model = 'json';
      Application.userConfig.templateTitle = 'Canada immigration';
      Application.userConfig.files = 'SampleData/Regional/canadaImmigration.json';
      Application._vent.trigger('controlpanel/subview/remove');
      Application._vent.trigger('controlpanel/menu/clear');
      Application._vent.trigger('controlpanel/parse'); // create collection

    };

    this.destroy = function() {};

  };

  var Currencies = function() {

    this.init = function() {

      Application.attrsMap = { x: "USD", y: "EUR", z: "CNY", category: "date" };
      Application.userConfig.template = 'pointcloud';
      Application.userConfig.model = 'json';
      Application.userConfig.templateTitle = 'Currencies';
      Application.userConfig.files = 'SampleData/Pointcloud/currencies.json';
      Application._vent.trigger('controlpanel/subview/remove');
      Application._vent.trigger('controlpanel/menu/clear');
      Application._vent.trigger('controlpanel/parse'); // create collection

    };

    this.destroy = function() {};

  };

  return {

    init: init,
    Earthquakes: Earthquakes,
    Immigration: Immigration,
    Currencies: Currencies

  };

};
