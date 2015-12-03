
// AngularJS controller with ngSanitize dependency
var app = angular.module('weatherWidget', ["ngSanitize"]);
app.controller('weatherController', function($scope, $http) {
    var callAPI = "//query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json";
    $http.get(callAPI)
        .success(function(data) {
            // Set local variables from JSON
            $scope.title = data.query.results.channel.item.title;
            $scope.city = getCity($scope.title);
            $scope.currentTemp = data.query.results.channel.item.condition.temp;
            $scope.currentCondition = data.query.results.channel.item.condition.text;
            $scope.forecast = data.query.results.channel.item.forecast;
            $scope.description = data.query.results.channel.item.description;
                
            $scope.weatherImage = getImage($scope.description);
        })
        .error(function(data) {
            console.log("Error retreiving data. Returned: " + data);
        });
});

// Manipulate title string to return just city and state
function getCity(string) {
    var splitString = string.split(",");
    var city = splitString[0].split(" ").pop();
    var state = splitString[1].split(" ").slice(1,2);

    return city + ", " + state;
}

// Create element of desciption and get image html
function getImage(htmlString) {
    var el = $( '<div></div>' ).html(htmlString);
    return $('img', el)[0].outerHTML;
}