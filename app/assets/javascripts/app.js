$(document).ready(function() {
    var user = new User(bootstrappedUser);
    var locations = new Locations(bootstrappedLocations, {user: user});
    var locationsLayout = new LocationsLayout({ el: '#locations-region' });
    // Would like to set this somewhere else
    locations.populatePreviouslySelected();
    locations.sort();
    var locationsView = new LocationsView({
        collection: locations
    });
    locationsLayout.getRegion('locationsList').show(locationsView);
});
