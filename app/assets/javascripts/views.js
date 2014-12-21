/**
 * View for one Location
 */
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

    /**
     * Make sure button/show values agree with model on
     * startup
     */
    onRender: function() {
        this.renderButton();
        this.showItem();
    },

    setSelected: function() {
        this.model.setSelected(true);
    },

    /**
     * Sets text and class for button based on model
     */
    renderButton: function() {
        if (this.model.getSelected()) {
            this.ui.selectedButton.text('Selected location');
            this.ui.selectedButton.addClass('button-primary');
        } else {
            this.ui.selectedButton.text('Select location');
            this.ui.selectedButton.removeClass('button-primary');
        }
    },

    /**
     * Displays or hides view based on show value
     */
    showItem: function() {
        if (this.model.getShow()) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    }
});

/**
 * CollectionView for Locations
 */
LocationsView = Backbone.Marionette.CollectionView.extend({
    childView: LocationView
});

/**
 * Layout encompassing text box and collectionview
 */
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

    /**
     * Calls search on locations collection
     */
    search: function() {
        var text = $(this.ui.searchBox).val();
        this.getRegion('locationsList').currentView.collection.search(text);
        this.getRegion('locationsList').currentView.render();
    }
});
