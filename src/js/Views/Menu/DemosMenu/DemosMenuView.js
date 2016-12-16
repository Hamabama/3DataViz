var Application = Application || {};

Application.DemosMenuView = Backbone.View.extend({

  tagName: 'div',

  className: 'menu__demos',

  initialize: function() {

    this.buttonNext = new Application.MenuControlsArrowButton({ className: 'arrow next next__frame' });

    this.buttonBack = new Application.MenuControlsArrowButton({ className: 'arrow back back__frame' });

    this.buttonNext.$el.on('click', this.showNextItem.bind(this));

    this.buttonBack.$el.on('click', this.showPreviousItem.bind(this));

    this.demoItemsLine = new Application.DemoItemsLine({ collection: Application.demoItemsCollection });

    this.listenTo(this.demoItemsLine, 'demoItemsLine:end', this.disableButtonNext);

    this.listenTo(this.demoItemsLine, 'demoItemsLine:start', this.disableButtonBack);

  },

  render: function() {

    this.$el.append( this.buttonNext.el );

    this.$el.append( this.buttonBack.el );

    this.$el.append( this.demoItemsLine.el );

    this.disableButtonBack();

    return this;

  },

  showNextItem: function() {

    this.demoItemsLine.showNextItem();
    this.enableButtonBack();

  },

  showPreviousItem: function() {

    this.demoItemsLine.showPreviousItem();
    this.enableButtonNext();

  },

  disableButtonNext: function() {

      this.buttonNext.hide();

  },

  disableButtonBack: function() {

      this.buttonBack.hide();

  },

  enableButtonNext: function() {

      this.buttonNext.show();

  },

  enableButtonBack: function() {

      this.buttonBack.show();

  },



});
