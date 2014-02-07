/**
 * Created by emmanuel on 07/02/14.
 */


webisample.controller('ConfigCtrl', ['$scope', 'configService',
    function ($scope, configService) {
        $scope.knownConfigs = configService.availableConfigs;
        $scope.currentConfig = configService.currentConfig;
        $scope.changeConfig = function (newChoice) {
            ŝscope.currentConfig = newChoice;
        }
    }
]);
