/**
 * Created by emmanuel on 07/02/14.
 */


webisample.controller('ConfigCtrl', ['$scope', 'configService',
    function ($scope, configService) {
        $scope.knownConfigs = configService.availableConfigs;
        $scope.currentConfig = configService.currentConfig;
        $scope.$watch(
            function () {
                return configService.currentConfig;
            },
            function (newVal, oldVal) {
                $scope.currentConfig = newVal;
            }
        );
        $scope.changeConfig = function (newVal) {
            console.log("New config, using : "  + newVal);
            configService.changeCurrentConfig(newVal);
        };
    }
]);

webisample.controller('CustomCtrl', ['$scope', 'webiLoader', function ($scope, webiLoader) {
    $scope.content = "Loading";
    webiLoader.load().then(function () {
        console.log("Ok, loaded");
        var tmp = new SayHello();
        loadRemoteRoutes();
        console.log(tmp.speak());
        $scope.content = tmp.speak();
        $scope.$digest();
    });

}]);
