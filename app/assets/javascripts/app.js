$(document).ready(function() {
    // Get all of our bootstrapped information to create user
    // and locations
    var user = new User(bootstrappedUser);
    var locations = new Locations(bootstrappedLocation, {user: user});

    var locationsLayout = new LocationsLayout({ el: '#locations-region' });
    // Sets the previously selected one to display correctly
    locations.populatePreviouslySelected();
    locations.sort();

    locationsLayout.getRegion('locationsList').show(new LocationsView({
        collection: locations
    }));
});
