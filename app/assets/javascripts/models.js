Location = Backbone.Model.extend({
    defaults: {
        'selected': false,
        'show': false
    },

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
        this.on('change:selected', function(model, val, options) {
            // When one model has been selected, unselect the last one (or ones)
            // Only want to run the gambit if the model has been selected
            if(val) {
                self.user.setLocationId(model.getId());
                _.each(self.without(model), function(m) {
                    m.setSelected(false);
                });
            }
        });
    },

    populatePreviouslySelected: function() {
        this.findWhere({ 'id': this.user.getLocationId() }).setSelected(true)
                                                           .setShow(true);
    },

    search: function(text) {
        if (!text) {
            return this;
        }

        var searchPattern = new RegExp(text, 'gi');
        var toShow = this.filter(function(d) {
            return searchPattern.test(d.getSearchStr());
        });

        _.each(toShow, function(m) {
            console.log('setting true');
            m.setShow(true);
        });

        _.each(this.without.apply(this, toShow), function(m) {
            console.log('setting false');
            m.setShow(false);
        });
    }
});

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
