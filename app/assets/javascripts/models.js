/**
 * Mirrors a Location in the database
 *
 * @class
 */
Location = Backbone.Model.extend({
    defaults: {
        'selected': false,
        'show': false
    },

    // Use getters and setters to make stack traces nicer
    getSearchStr: function() {
        return this.get('search_str');
    },

    getSelected: function() {
        return this.get('selected');
    },

    setSelected: function(selected) {
        return this.set('selected', selected);
    },

    getId: function() {
        return this.get('id');
    },
    
    getShow: function() {
        return this.get('show');
    },

    setShow: function(show) {
        this.set('show', show);
    }
});

/**
 * Collection of Locations
 */
Locations = Backbone.Collection.extend({
    model: Location,

    /**
     * Always have selected one at top
     */
    comparator: function(location) {
        return !location.getSelected();
    },

    initialize: function(models, options) {
        this.user = options.user;

        var self = this;
        // When a model's selected value changes, propagate changes
        this.on('change:selected', this.changeSelected);
    },

    /**
     * When a model's selected value changes, makes sure that
     * we only have one selected model
     *
     * @param {Location} model - changed Location model
     * @param {bool} val - value of `selected` in new model
     */
    changeSelected: function(model, val) {
        // When one model has been selected, unselect the last one (or ones)
        // Only want to run the gambit if the model has been selected
        if(val) {
            self.user.setLocationId(model.getId());
            _.each(self.without(model), function(m) {
                m.setSelected(false);
            });

            // Keeps the selected one on top always
            self.sort();
        }
    },

    /**
     * Called at startup when we want to display the previously selected
     * one automatically
     */
    populatePreviouslySelected: function() {
        this.findWhere({ 'id': this.user.getLocationId() }).setSelected(true)
                                                           .setShow(true);
    },

    /**
     * Filters the collection based on `text` in search_str
     *
     * @param {str} text - text to filter on
     */
    search: function(text) {
        // If someone deletes everything, want to show nothing
        if (text == '') {
            this.map(function(m) {
                if (!m.getSelected()) {
                    m.setShow(false);
                }
            });
        } else {
            // This snippet partially inspired by
            // http://backbonefu.com/2011/08/filtering-a-collection-in-backbone-js/
            var searchPattern = new RegExp(text, 'gi');
            // Want to show only if it's a match or it's the currently selected one
            this.map(function(m) {
                m.setShow(searchPattern.test(m.getSearchStr()) || m.getSelected());
            });
        }
    }
});

/**
 * User model
 *
 * @class
 */
User = Backbone.Model.extend({
    urlRoot: '/users',
    setLocationId: function(location_id) {
        this.set('location_id', location_id);
        this.save({ patch: true });
    },

    getLocationId: function() {
        return this.get('location_id');
    }
});
