var pcaCtrl = angular.module('pca-rest', ['ngResource', 'spring-data-rest', 'angular-toArrayFilter', 'oitozero.ngSweetAlert']);

// ---------- Variables ----------

pcaCtrl
    .value('notificationServiceUrl', null)

// ---------- Utilities ----------

pcaCtrl.filter('getByKey', function () {
    return function (propertyName, collection) {
        var len = collection.length;
        var value = '';
        for (var i = 0; i < len; i++) {
            if (collection[i].key == propertyName) {
                value = collection[i].value;
            }
        }
        return value;
    }
});


// ---------- Services ----------


pcaCtrl.factory('LoadingPropertiesService', function ($http) {
    //console.log("LoadingPropertiesService factory");

    $http.get('resources/pcaportal.properties')
        .success(function (response) {
            notificationServiceUrl = angular.toJson(response.notificationServiceUrl, true);

            localStorage['notificationServiceUrl'] = angular.toJson(response.notificationServiceUrl, true);

            //console.log('LoadingPropertiesService notificationServiceUrl set to ', localStorage['notificationServiceUrl']);
        })
        .error(function (response) {
            //console.error('LoadingPropertiesService $http.get error', status, response);
        });

    return {
        doNothing: function () {
            return null;
        }
    };
});


pcaCtrl.factory('NotificationService', function ($http, $rootScope, LoadingPropertiesService, $interval) {

    localStorage['pa.session'] = "null";

    var NotificationServiceRefreshTime = 2000;

    var notificationList = [];


    function getNotificationService() {
            //console.log("getNotificationService while user connected with " + localStorage['pa.session']);

            //console.log('get called every 2 s')

            var notificationRestUrl = JSON.parse(localStorage['notificationServiceUrl']);


            var httpPromise = $http.get(notificationRestUrl + 'notifications')
                .success(function (response) {
                    notificationList = response;
                    $rootScope.$broadcast('event:NotificationService');
                    //console.log('finish the fetching of data')
                })
                .error(function (response) {

                });

        }


    function refreshNotificationService() {

        // Interval initialization
        var intervalPromise = $rootScope.$interval(getNotificationService, NotificationServiceRefreshTime);
        //console.log("set the timer of the notification")
        // Interval stopping condition
    }
    refreshNotificationService();
    return {
        getNotificationList: function () {
            return notificationList;
        },
        refreshNotificationService: function () {
            return refreshNotificationService();
        }
    };
});




// ---------- Controllers ----------

pcaCtrl.controller('NotificationController', function ($scope, $rootScope, $http, SpringDataRestAdapter, NotificationService) {

    $rootScope.$on('event:NotificationService', function () {
        $scope.notificationList = NotificationService.getNotificationList();
        //console.log('notification list available');
        //console.log($scope.notificationList);
    });

});





