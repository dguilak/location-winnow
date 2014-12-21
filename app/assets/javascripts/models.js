Location = Backbone.Model.extend({
    defaults: {
        'selected': false
    },

    getSelected: function() {
        return this.get('selected');
    },

    setSelected: function(selected) {
        this.set('selected', selected);
    },

    getId: function() {
        return this.get('id');
    }
});

Locations = Backbone.Collection.extend({
    model: Location,
    url: '/locations',

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
    }
});

User = Backbone.Model.extend({
    urlRoot: '/users',
    setLocationId: function(location_id) {
        this.set('location_id', location_id);
        this.save({ patch: true });
    }
});
