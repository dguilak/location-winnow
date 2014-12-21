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
        'change:selected': 'renderButton'
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
    }
});

LocationsView = Backbone.Marionette.CollectionView.extend({
    childView: LocationView
});
