var Application = Application || {};


Application.DemoItemModel = Backbone.Model.extend({

  defaults: {

    name: '',
    imgUrl: '',
    href: '',
    description: '',
    selected: false

  }

});

Application.DemoItemsCollection = Backbone.Collection.extend({

  model: Application.DemoItemModel

});


Application.demoItemsCollection = new Application.DemoItemsCollection([

  new Application.DemoItemModel({

    name: 'Earthquakes',

    imgUrl: 'src/Assets/images/examples/earthquakes.jpg',

    href: '#earthquakes',

    description: 'This visualization shows the earthquakes happened over some time around the world.'

  }),

  new Application.DemoItemModel({

    name: 'Immigration',

    imgUrl: 'src/Assets/images/examples/immigration.jpg',

    href: '#immigration',

    description: 'This visualization show immigration volumes per country to Canada.'

  }),

  new Application.DemoItemModel({

    name: 'Currencies',

    imgUrl: 'src/Assets/images/examples/currencies.jpg',

    href: '#currencies',

    description: 'This visualization show currencies data over some time.'

  })

]);
