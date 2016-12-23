var Application = Application || {};

/**
* Application.GlobeRouter (Controller)
* Perform functions besed on the parameters from URL.
* @return null
*/
Application.RootRouter = Backbone.Router.extend({

  routes: {
    "": "initRootView",
    "earthquakes":"initEarthquakes",
    "immigration":"initImmigration",
    "currencies":"initCurrencies"
  },
  initRootView: function() {

    this.view = new Application.RootView();
    $(".application-frame").append(this.view.render().$el);
    this.examples = new Application.Examples();
    this.examples.init();

  },
  checkInit: function() {

    if (!this.view) this.initRootView();

    this.view.menuRootView.menuClose();

    this.view.introPage.remove();

    if (this.exampleView) this.exampleView.destroy();
  },
  initEarthquakes: function() {
    this.checkInit();
    this.exampleView = new this.examples.Earthquakes();
    this.exampleView.init();
  },
  initImmigration: function() {
    this.checkInit();
    this.exampleView = new this.examples.Immigration();
    this.exampleView.init();
  },
  initCurrencies: function() {
    this.checkInit();
    this.exampleView = new this.examples.Currencies();
    this.exampleView.init();
  },

});
