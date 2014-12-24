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
     * Creates a debounced search function that'll only get called
     * once every 1000 ms to deal with instant search (kind of
     * throttles ajax calls)
     *
     * TODO: I know that this will trigger for non-input keys, can
     * fix later
     */
    search: _.debounce(function() {
        var text = $(this.ui.searchBox).val();
        var currentView = this.getRegion('locationsList').currentView;
        var selected = currentView.collection.findWhere({ selected: true });

        // Only going to trigger with 2 or more characters
        if (text.length > 1) {
            $.get('locations/', { query: text }, function(d) {
                // Make sure that selected one is always in set
                d.push(selected);
                currentView.collection.set(d);
            });
        } else {
            // Clear the list except for the selected one
            currentView.collection.set(selected);
        }

        currentView.render();
    }, 500)
});
