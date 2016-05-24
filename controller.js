var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.message = "";
    var webSerLink = "http://52.221.229.107:8080/search?q=";

    $scope.hover = function(index, notEmpty) {
        if (notEmpty) {
            $scope.selectedIndex = index;
        }
    }

    $scope.leave = function() {
        $scope.selectedIndex = -1;
    }

    $scope.addExample = function() {
        $scope.message += "PART ONE\nHello World, !!!\nred, or a glistening apparition of black showed where the unintended\nGood morning, John.\n";
    }

    $scope.tryAgain = function() {
        window.location.reload();
    }

    $scope.search = function() {
        $scope.loading = true;
        var res = encodeURI($scope.message);
        // var res = encodeURI("s\nLanguage: english\nLanguage: English");
        res = res.replace(/%0A/g, "%5Cn");

        $http({
            method: "GET",
            url: webSerLink + res,
            dataType: 'jsonp',
            crossDomain: true
        }).then(function mySucces(response) {
            $scope.loading = false;
            console.log("looking for " + $scope.message + " with " + webSerLink + res);
            $scope.result = response.data;
            $scope.done = true;
        }, function myError(response) {
            $scope.result = response.statusText;
        });
    }
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
