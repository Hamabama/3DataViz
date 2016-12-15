var Application = Application || {};

Application.MenuItemModel = Backbone.Model.extend( {
  defaults: {
    displayName: '',
    viewName: '',
    selected: false
  }
} );

Application.MenuItemsCollection = Backbone.Collection.extend({

  model: Application.MenuItemModel

});

Application.menuItemsCollection = new Application.MenuItemsCollection([

  new Application.MenuItemModel({

  displayName: 'Demos',
  viewName : 'demos'


  }),

  new Application.MenuItemModel({

  displayName: 'Your Dataset',
  viewName: 'templates'

  }),

  new Application.MenuItemModel({

  displayName: 'Instruction',
  viewName: 'instruction'

  }),

  new Application.MenuItemModel({

  displayName: 'Credits',
  viewName: 'credits'

  })

]);
