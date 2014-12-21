LocationView = Backbone.Marionette.ItemView.extend({
    template: '#location-template',
    className: 'location-entry',
    model: Location,
    
    ui: {
        'selectedButton': 'button'
    },

    events: {
        'click @ui.selectedButton': 'setSelected'
    },
    
    modelEvents: {
        'change:selected': 'renderButton',
        'change:show': 'showItem'
    },

    onRender: function() {
        this.renderButton();
        this.showItem();
    },

    setSelected: function() {
        this.model.setSelected(true);
    },

    renderButton: function() {
        if (this.model.getSelected()) {
            this.ui.selectedButton.addClass('button-primary');
        } else {
            this.ui.selectedButton.removeClass('button-primary');
        }
    },

    showItem: function() {
        if (this.model.getShow()) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    }
});

LocationsView = Backbone.Marionette.CollectionView.extend({
    childView: LocationView
});

LocationsLayout = Backbone.Marionette.LayoutView.extend({
    regions: {
        'locationsList': '#locations-container'
    },
    
    ui: {
        'searchBox': '#store-search'
    },

    events: {
        'keyup @ui.searchBox': 'search'
    },

    search: function() {
        var text = $(this.ui.searchBox).val();
        this.getRegion('locationsList').currentView.collection.search(text);
        this.getRegion('locationsList').currentView.render();
    }
});
