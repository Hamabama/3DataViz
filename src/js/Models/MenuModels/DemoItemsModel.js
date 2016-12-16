var Application = Application || {};


Application.DemoItemModel = Backbone.Model.extend({
  defaults: {
    name: '',
    imgUrl: '',
    href: ''
  }
});

Application.DemoItemsCollection = Backbone.Collection.extend({

  model: Application.DemoItemModel

});


Application.demoItemsCollection = new Application.DemoItemsCollection([

  new Application.DemoItemModel({

    name: 'Earthquakes',

    imgUrl: 'src/Assets/images/examples/earthquakes.jpg',

    href: '#earthquakes'

  }),

  new Application.DemoItemModel({

    name: 'Immigration',

    imgUrl: 'src/Assets/images/examples/immigration.jpg',

    href: '#immigration'

  }),

  new Application.DemoItemModel({

    name: 'Currencies',

    imgUrl: 'src/Assets/images/examples/currencies.jpg',

    href: '#currencies'

  }),

]);
