$(document).ready(function() {
    var user = new User(bootstrappedUser);
    var locations = new Locations(bootstrappedLocations, {user: user});
    var locationsView = new LocationsView({
        collection: locations,
        el: '#locations-container'
    }).render();
});
