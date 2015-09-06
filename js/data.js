var url = 'http://camp.efigence.com/camp/api/places';
var getPlaces = new module(url);

getPlaces.sendRequest('GET').then(function(response) {
    var arr = JSON.parse(response);
    getPlaces.paginate(arr);
    getPlaces.loadArray(arr);
}, function(error) {
    console.log("Something goes wrong");
});



