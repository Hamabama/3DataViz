var Application = Application || {};

Application.MenuModel = Backbone.Model.extend({

  defaults: {

    'currentView': 'mainMenu',
    'next': ''

  }

});

Application.menuModel = new Application.MenuModel();
