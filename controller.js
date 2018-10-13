var titleApp = angular.module('titleApp', []);
titleApp.controller('mainCtrl', function($scope, $http) {
    $scope.numResultsString = "";
    $scope.searchMovie = function() {
        var url = "https://api.themoviedb.org/3/search/movie?api_key=5b9c9215cbec20ec60b63d9f07f6a17e&query=";
        $scope.imgUrl = "https://image.tmdb.org/t/p/w500";
        url += encodeURI($scope.titleInput);
        $scope.movies = [];
        $http.get(url)
            .then(function(response) {
                $scope.movies = [];
                console.log(response.data);
                for(var i=0; i<response.data.results.length; i++) {
                    if(!response.data.results[i].adult) {
                        response.data.results[i].poster_path = $scope.imgUrl + response.data.results[i].poster_path;
                        $scope.movies.push(response.data.results[i]);
                    }
                }
                
                $scope.numResultsString = "Showing " + $scope.movies.length + " results.";
                
                
                
            });
    };
});

titleApp.directive('imageli', function() {
   return {
       scope: {
           movie: "="
       },
       restrict: "E",
       template: "<h1>{{movie.original_title}}</h1>" + 
        "<img src='{{movie.poster_path}}'>"
   };
});
