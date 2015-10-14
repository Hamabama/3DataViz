var Application = Application || {};

Application.Examples = {

  init: function() {

    var _this = this;
    Application.userConfig.model = 'json';

    var list = ['earthquakes','immigration'];

    var $samplesDiv = $('#examples');
    $samplesDiv.append('<div class="heading">Choose an example<div/>')
    var $templist = $('<ul class=""></ul>');
    var $wrap = $('<div class="templateImgList"></div>')

    $.each(list, function(index, item) {
      $templist.append('<li><button class="imgBtn"><img id="' + item + '" src="Assets/images/examples/'+ item + '.png"><p class="templateTitle">'+item+'</p></button></li>');
    });
    $samplesDiv.append($wrap.append($templist));

    $('button.imgBtn', $samplesDiv).on('click', this.action.bind(this));

    return this;

  },
  destroy: function() {

  },
  action: function(e) {

    var id = $(e.target).attr('id');

    if (this.module) this.module.destroy();

    this.module = new this[id];
    this.module.init();
  },
  earthquakes: function () {

    this.init = function() {

      Application._vent.on('data/ready', this.callTimeline, this);

      Application.attrsMap = {date: "time", latitude: "latitude", longitude: "longitude"};
      Application.userConfig.template = 'dynamic';
      Application.userConfig.templateTitle = 'Earthquakes';
      Application.userConfig.files = 'SampleData/Location/earthquake.json';
      Application._vent.trigger('controlpanel/parse'); // create collection

    },
    this.destroy = function() {

      Application._vent.unbind('data/ready', this.callTimeline);


    },
    this.callTimeline = function() {

      Application._vent.trigger('timeline/on');

    }

  },
  immigration: function() {

    this.init = function() {

      Application._vent.on('data/ready', this.callTimeline, this);

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
      }
      Application.userConfig.template = 'countries';
      Application.userConfig.templateTitle = 'Canada immigration';
      Application.userConfig.files = 'SampleData/Regional/canadaImmigration.json';
      Application._vent.trigger('controlpanel/parse'); // create collection

    },
    this.destroy = function() {

    }

  }

}
