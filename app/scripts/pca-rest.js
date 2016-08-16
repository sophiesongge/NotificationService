var pcaCtrl = angular.module('pca-rest', ['ngResource', 'spring-data-rest', 'angular-toArrayFilter', 'oitozero.ngSweetAlert']);

// ---------- Variables ----------

pcaCtrl
    .value('pcaServiceUrl', null)
    .value('schedulerRestUrl', null);

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

//
// // ---------- Services ----------
//
// pcaCtrl.factory('LoadingPropertiesService', function ($http) {
//     console.log("LoadingPropertiesService factory");
//
//     $http.get('resources/pcaportal.properties')
//         .success(function (response) {
//             pcaServiceUrl = angular.toJson(response.pcaServiceUrl, true);
//             schedulerRestUrl = angular.toJson(response.schedulerRestUrl, true);
//
//             localStorage['pcaServiceUrl'] = angular.toJson(response.pcaServiceUrl, true);
//             localStorage['schedulerRestUrl'] = angular.toJson(response.schedulerRestUrl, true);
//
//             console.log('LoadingPropertiesService pcaServiceUrl set to ', pcaServiceUrl);
//             console.log('LoadingPropertiesService schedulerRestUrl set to ', schedulerRestUrl);
//         })
//         .error(function (response) {
//             console.error('LoadingPropertiesService $http.get error', status, response);
//         });
//
//     return {
//         doNothing: function () {
//             return null;
//         }
//     };
// });
//
// pcaCtrl.factory('SchedulerService', function ($http, $rootScope, SpringDataRestAdapter, LoadingPropertiesService, $interval) {
//
//     localStorage['pa.session'] = "null";
//
//     var SchedulerServiceRefreshTime = 2000;
//
//     var jobList = [];
//     var nbPendingRequests = 0;
//     var nbTotalProcesses = 0;
//     var nbRunningProcesses = 0;
//
//     function doLogin(userName, userPass) {
//         var authData = $.param({'username': userName, 'password': userPass});
//         var authConfig = {
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             transformResponse: []
//         };
//         // because of that wrong response type in that sched resource !!!
//         return $http.post(JSON.parse(localStorage['schedulerRestUrl']) + 'login', authData, authConfig)
//             .success(function (response) {
//                 if (response.match(/^[A-Za-z0-9]+$/)) {
//                     localStorage['pa.session'] = response;
//                     console.log("SchedulerService.doLogin authentification succeed " + response);
//                 }
//                 else {
//                     console.log("SchedulerService.doLogin authentification failed " + response);
//                 }
//             })
//             .error(function (response) {
//                 console.error('SchedulerService.doLogin authentification error', status, response);
//             });
//     };
//
//     function getSchedulerService() {
//         if (!angular.equals(localStorage['pa.session'], "null")) {
//             console.log("getSchedulerService while user connected with " + localStorage['pa.session']);
//             var scopeResponse;
//             var scopeProcessedResponse;
//             var jobsInfoConfig = {headers: {'sessionid': localStorage['pa.session']}};
//             var schedulerRestUrl = JSON.parse(localStorage['schedulerRestUrl']);
//
//             console.log("SchedulerService.getSchedulerService http.get url : " + schedulerRestUrl + 'jobsinfo');
//             console.log("SchedulerService.getSchedulerService http.get config : " + angular.toJson(jobsInfoConfig, true));
//
//             var httpPromise = $http.get(schedulerRestUrl + 'jobsinfo', jobsInfoConfig)
//                 .success(function (response) {
//                     //console.log("SchedulerService.refreshSchedulerService $http.get success " + angular.toJson(response, true));
//                 })
//                 .error(function (response) {
//                     console.error("SchedulerService.getSchedulerService $http.get error", status, response);
//                 });
//
//             SpringDataRestAdapter.process(httpPromise).then(function (processedResponse) {
//                 scopeProcessedResponse = angular.toJson(processedResponse, true);
//                 jobList = processedResponse.list;
//                 var pendingJobs = $.grep(jobList, function (n, i) {
//                     return n.jobInfo.status === 'PENDING';
//                 });
//                 nbPendingRequests = pendingJobs.length;
//                 nbTotalProcesses = jobList.length;
//                 var runningJobs = $.grep(jobList, function (n, i) {
//                     return n.jobInfo.status === 'RUNNING';
//                 });
//                 nbRunningProcesses = runningJobs.length;
//                 $rootScope.$broadcast('event:SchedulerService');
//             });
//         }
//     }
//
//     function refreshSchedulerService() {
//
//         // Interval initialization
//         var intervalPromise = $rootScope.$interval(getSchedulerService, SchedulerServiceRefreshTime);
//
//         // Interval stopping condition
//         $rootScope.$on('event:StopRefreshing', function () {
//             console.log("event:StopRefreshing for refreshSchedulerService received");
//             if (angular.isDefined(intervalPromise)) {
//                 $interval.cancel(intervalPromise);
//                 intervalPromise = undefined;
//             }
//         });
//     }
//
//     return {
//         getJobList: function () {
//             return jobList;
//         },
//         getNbPendingRequests: function () {
//             return nbPendingRequests;
//         },
//         getNbTotalProcesses: function () {
//             return nbTotalProcesses;
//         },
//         getNbRunningProcesses: function () {
//             return nbRunningProcesses;
//         },
//         doLogin: function (userName, userPass) {
//             return doLogin(userName, userPass);
//         },
//         isConnected: function () {
//             return !angular.equals(localStorage['pa.session'], "null");
//         },
//         refreshSchedulerService: function () {
//             return refreshSchedulerService();
//         }
//     };
// });
//
// pcaCtrl.factory('CatalogService', function ($http, $rootScope, SpringDataRestAdapter) {
//
//     var CatalogServiceRefreshTime = 2000;
//
//     // TODO: Should be put into a config file
//     var catalogUrl = '/workflow-catalog/buckets/';
//     var bucketId = "1";
//     // TODO: add the correct criteria to fetch only the deployment wfs
//
//     var workflowMetadataList;
//     var nbServices;
//
//     function refreshCatalogService() {
//         var scopeResponse;
//         var processedResponse;
//         var queryStr = 'generic_information("Action","create")';
//         var queryConfig = {
//             params: {query: queryStr},
//             headers: {'Content-Type': 'application/x-www-form-urlencoded', 'sessionid': localStorage['pa.session']}
//         };
//
//         console.log("CatalogService.refreshCatalogService http.get url : " + catalogUrl + bucketId + '/workflows');
//         console.log("CatalogService.refreshCatalogService http.get config : " + angular.toJson(queryConfig, true));
//
//         var httpPromise = $http.get(catalogUrl + bucketId + '/workflows', queryConfig)
//             .success(function (response) {
//                 console.log("CatalogService.refreshCatalogService http.get success " + angular.toJson(response, true));
//             })
//             .error(function (response) {
//                 console.error("CatalogService.refreshCatalogService http.get error", status, response);
//             });
//         SpringDataRestAdapter.process(httpPromise).then(function (processedResponse) {
//             workflowMetadataList = processedResponse._embeddedItems;
//             nbServices = processedResponse.page.totalElements;
//             processedResponse = angular.toJson(processedResponse, true);
//             $rootScope.$broadcast('event:CatalogService');
//         });
//     }
//
//     return {
//         getWorkflowMetadataList: function () {
//             return workflowMetadataList;
//         },
//         getNbServices: function () {
//             return nbServices;
//         }
//     };
// });
//
// pcaCtrl.factory('IaaSConnectorService', function ($rootScope, $http, SpringDataRestAdapter) {
//
//     var IaaSConnectorUrl = '/connector-iaas/infrastructures/';
//     var IaaSConnectorServiceRefreshTime = 2000;
//
//     var nbRunningServices = 0;
//     var runningServices;
//
//     function refreshIaaSConnectorService() {
//         var scopeResponse;
//         var allServices = [];
//
//         var httpPromise = $http.get(IaaSConnectorUrl)
//             .success(function (response) {
//                 scopeResponse = angular.toJson(response, true);
//             });
//         SpringDataRestAdapter.process(httpPromise).then(function (processedResponse) {
//             angular.forEach(processedResponse, function (infraValue, infraKey) {
//                 var instances;
//                 $http.get(IaaSConnectorUrl + infraKey + '/instances')
//                     .success(function (responseInstances) {
//                         instances = responseInstances;
//                     })
//                     .error(function (responseInstances) {
//                         console.log('error while getting ' + IaaSConnectorUrl + infraKey + '/instances');
//                         console.log(responseInstances);
//                     })
//                     .then(function () {
//                         angular.forEach(instances, function (instanceValue, instanceKey) {
//                             var instance = {};
//                             instance.id = instanceValue.id;
//                             instance.tag = instanceValue.tag;
//                             instance.status = instanceValue.status;
//                             instance.infra = infraKey;
//                             allServices.push(instance);
//                             nbRunningServices = allServices.length;
//                         });
//                     });
//             });
//             runningServices = allServices;
//         });
//         $rootScope.$broadcast('event:IaaSConnectorService');
//     }
//
//     return {
//         getNbRunningServices: function () {
//             return nbRunningServices;
//         },
//         getRunningServices: function () {
//             return runningServices;
//         }
//     };
// });
//
// pcaCtrl.factory('PCACatalogService', function ($rootScope, $http, SpringDataRestAdapter, $interval) {
//
//     var PCACatalogServiceUrl = JSON.parse(localStorage['pcaServiceUrl']) + 'catalog/services';
//     var PCACatalogServiceRefreshTime = 2000;
//
//     var servicesList = [];
//     var nbServices = 0;
//
//     function getPCACatalogService() {
//
//         var scopeResponse;
//
//         console.log("PCACatalogService.getPCACatalogService http.get url : " + PCACatalogServiceUrl);
//
//         var httpPromise = $http.get(PCACatalogServiceUrl)
//             .success(function (response) {
//                 // console.log("PCACatalogService.getPCACatalogService http.get success " + angular.toJson(response, true));
//             })
//             .error(function (response) {
//                 console.error("PCACatalogService.getPCACatalogService http.get error", status, response);
//             });
//
//         SpringDataRestAdapter.process(httpPromise).then(function (processedResponse) {
//             servicesList = processedResponse._embeddedItems;
//             nbServices = processedResponse.page.totalElements;
//             $rootScope.$broadcast('event:PCACatalogService');
//         });
//     }
//
//     function refreshPCACatalogService() {
//
//         // Interval initialization
//         var intervalPromise = $rootScope.$interval(getPCACatalogService, PCACatalogServiceRefreshTime);
//
//         // Interval stopping condition
//         $rootScope.$on('event:StopRefreshing', function () {
//             console.log("event:StopRefreshing for refreshPCACatalogService received");
//             if (angular.isDefined(intervalPromise)) {
//                 $interval.cancel(intervalPromise);
//                 intervalPromise = undefined;
//             }
//         });
//     }
//
//     return {
//         getServicesList: function () {
//             return servicesList;
//         },
//         getNbServices: function () {
//             return nbServices;
//         },
//         refreshPCACatalogService: function () {
//             return refreshPCACatalogService();
//         }
//     };
// });
//
// pcaCtrl.factory('PCAProcessService', function ($rootScope, $http, $interval) {
//
//     var PCAProcessServiceUrl = JSON.parse(localStorage['pcaServiceUrl']) + 'TO-BE-DETERMINED';
//     var PCAProcessServiceRefreshTime = 2000;
//     var processesList = {};
//
//     function getPCAProcessService() {
//
//         var scopeResponse;
//
//         processesList = {
//             'id-ABC': {
//                 'team': 'admin',
//                 'processName': 'create spark instance',
//                 'processStatus': 'RUNNING'
//             },
//             'id-DEF': {
//                 'team': 'paraita',
//                 'processName': 'create openstack instance',
//                 'processStatus': 'RUNNING'
//             }
//         };
//         $rootScope.$broadcast('event:PCAProcessService');
//     }
//
//     function refreshPCAProcessService() {
//
//         // Interval initialization
//         var intervalPromise = $rootScope.$interval(getPCAProcessService, PCAProcessServiceRefreshTime);
//
//         // Interval stopping condition
//         $rootScope.$on('event:StopRefreshing', function () {
//             console.log("event:StopRefreshing for refreshPCAProcessService received");
//             if (angular.isDefined(intervalPromise)) {
//                 $interval.cancel(intervalPromise);
//                 intervalPromise = undefined;
//             }
//         });
//     }
//
//     return {
//         getProcessesList: function () {
//             return processesList;
//         },
//         refreshPCAProcessService: function () {
//             return refreshPCAProcessService;
//         }
//     };
//
// });
//
//
// pcaCtrl.factory('PCANodeSourcesService', function ($rootScope, $http, $interval) {
//
//     var existingNodeSourceList = [];
//
//     function getNodeSourceList(variable) {
//
//         var req = {
//             method: 'GET',
//             url: JSON.parse(localStorage['pcaServiceUrl']) + 'rm/nodesourcesName',
//             headers: {
//                 'content-type': 'application/json',
//                 'sessionid': localStorage['pa.session']
//             }
//         };
//         $http(req)
//             .success(function (response) {
//                 console.log(response);
//                 existingNodeSourceList = response;
//             })
//             .error(function (response) {
//                 console.log("error while getting getNodeSourceList !!!!!!!");
//                 console.log(response);
//             })
//             .then(function () {
//                 console.log();
//             });
//     };
//
//     return {
//         getExistingNodeSourceList: function () {
//             return existingNodeSourceList;
//         },
//         getNodeSourceList: function () {
//             return getNodeSourceList();
//         }
//     }
//
//
// });
//
//
// pcaCtrl.factory('PCARunningServicesService', function ($rootScope, $http, $interval) {
//
//     var PCARunningServicesServiceUrl = JSON.parse(localStorage['pcaServiceUrl']) + 'serviceInstances';
//     var PCARunningServicesServiceRefreshTime = 2000;
//     var runningServicesList = {};
//     var nbRunningServices = 0;
//
//     function getPCARunningServicesService() {
//
//         console.log("PCARunningServicesService.getPCARunningServicesService http.get url : " + PCARunningServicesServiceUrl);
//
//         $http.get(PCARunningServicesServiceUrl)
//             .success(function (response) {
//                 runningServicesList = response;
//                 var keys = Object.keys(runningServicesList);
//                 nbRunningServices = keys.length;
//                 console.log("PCARunningServicesService.getPCARunningServicesService http.get success " + angular.toJson(response, true));
//                 $rootScope.$broadcast('event:PCARunningServicesService');
//             })
//             .error(function (response) {
//                 console.error("PCARunningServicesService.getPCARunningServicesService http.get error", status, response);
//             });
//
//         $rootScope.$broadcast('event:PCARunningServicesService');
//     }
//
//     function refreshPCARunningServicesService() {
//
//         // Interval initialization
//         var intervalPromise = $rootScope.$interval(getPCARunningServicesService, PCARunningServicesServiceRefreshTime);
//
//         // Interval stopping condition
//         $rootScope.$on('event:StopRefreshing', function () {
//             console.log("event:StopRefreshing for refreshPCARunningServicesService received");
//             if (angular.isDefined(intervalPromise)) {
//                 $interval.cancel(intervalPromise);
//                 intervalPromise = undefined;
//             }
//         });
//     }
//
//     return {
//         getRunningServicesList: function () {
//             return runningServicesList;
//         },
//         getPCARunningServicesServiceUrl: function () {
//             return PCARunningServicesServiceUrl;
//         },
//         getNbRunningServices: function () {
//             var keys = Object.keys(runningServicesList);
//             return nbRunningServices;
//         },
//         refreshPCARunningServicesService: function () {
//             return refreshPCARunningServicesService();
//         }
//
//     };
// });
//
//
// // ---------- Controllers ----------
//
// pcaCtrl.controller('SchedulerController', function ($scope, $rootScope, $http, SpringDataRestAdapter, SchedulerService) {
//
//     $scope.jobsList = [];
//
//     $rootScope.$on('event:SchedulerService', function () {
//         $scope.jobsList = SchedulerService.getJobList();
//     });
//
// });
//
// pcaCtrl.controller('MonitoringController', function ($scope, $rootScope, $http, SpringDataRestAdapter, SchedulerService, PCACatalogService, PCARunningServicesService) {
//
//     $scope.nbPendingRequests = 0;
//     $scope.nbTotalProcesses = 0;
//     $scope.nbRunningServices = 0;
//     $scope.nbRunningProcesses = 0;
//     $scope.nbServices = 0;
//
//     $rootScope.$on('event:SchedulerService', function () {
//         console.log('event:SchedulerService');
//         $scope.nbPendingRequests = SchedulerService.getNbPendingRequests();
//         $scope.nbTotalProcesses = SchedulerService.getNbTotalProcesses();
//         $scope.nbRunningProcesses = SchedulerService.getNbRunningProcesses();
//     });
//
//     $rootScope.$on('event:PCARunningServicesService', function () {
//         console.log('event:PCARunningServicesService ' + PCARunningServicesService.getNbRunningServices());
//         $scope.nbRunningServices = PCARunningServicesService.getNbRunningServices();
//     });
//
//     $rootScope.$on('event:PCACatalogService', function () {
//         console.log('event:PCACatalogService ' + PCACatalogService.getNbServices());
//         $scope.nbServices = PCACatalogService.getNbServices();
//     });
//
// });
//
// pcaCtrl.controller('PCACatalogController', function ($scope, $rootScope, $uibModal, $http, $filter, PCACatalogService, PCANodeSourcesService) {
//
//     $scope.servicesList = [];
//
//     $scope.listOfNS = function () {
//         console.log(PCANodeSourcesService.getExistingNodeSourceList());
//         return PCANodeSourcesService.getExistingNodeSourceList();
//     };
//
//     $rootScope.$on('event:PCACatalogService', function () {
//         $scope.servicesList = PCACatalogService.getServicesList();
//         console.log('event:PCACatalogService');
//     });
//
//     $scope.findImageUrl = function (selectedWorkflow) {
//         return $filter('getByKey')('pca.action.icon', selectedWorkflow.generic_information);
//     };
//
//     $scope.showSubmitWorkflowModal = function (selectedWorkflow) {
//         var modalInstance = $uibModal.open({
//             templateUrl: 'views/common/submit_window.html',
//             controller: ModalViewSubmit,
//             windowClass: "animated fadeIn",
//             resolve: {
//                 workflowToSubmit: function () {
//                     return selectedWorkflow;
//                 }
//             }
//         });
//     };
//
//     function ModalViewSubmit($scope, $uibModalInstance, SweetAlert, workflowToSubmit) {
//         $scope.workflow = workflowToSubmit;
//
//         $scope.ok = function (modifiedWorkflow) {
//             $scope.submit(modifiedWorkflow);
//         };
//
//         $scope.cancel = function () {
//             $uibModalInstance.dismiss('cancel');
//         };
//
//         $scope.submit = function (modifiedWorkflow) {
//             console.log("Workflow to submit for creation:");
//             console.log(modifiedWorkflow);
//             var variables = {};
//             angular.forEach(modifiedWorkflow.variables, function (item) {
//                 if (item.value.startsWith('#{') || item.value.startsWith('${')) {
//                     variables[item.key] = modifiedWorkflow.newvariables[item.key].value;
//                 } else {
//                     variables[item.key] = item.value;
//                 }
//             });
//             var payloadParams = {
//                 'variables': variables,
//                 'genericInfo': {
//                     'pca.service.model': $filter('getByKey')('pca.service.model', modifiedWorkflow.generic_information),
//                     'pca.service.name': $filter('getByKey')('pca.service.name', modifiedWorkflow.generic_information)
//                 }
//             };
//             var configHeaders = {
//                 headers: {
//                     'content-type': 'application/json',
//                     'sessionid': localStorage['pa.session']
//                 }
//             };
//
//             var pcaServiceUrl = JSON.parse(localStorage['pcaServiceUrl']);
//
//             console.log("ModalViewSubmit http.post url : " + pcaServiceUrl + 'serviceInstances');
//             console.log("ModalViewSubmit http.post data " + angular.toJson(payloadParams, true));
//             console.log("ModalViewSubmit http.post config " + angular.toJson(configHeaders, true));
//
//             $http.post(pcaServiceUrl + 'serviceInstances', payloadParams, configHeaders)
//                 .success(function (response) {
//                     console.log("ModalViewSubmit $http.post success");
//                     $uibModalInstance.close();
//                     SweetAlert.swal({
//                         title: "Good job!",
//                         text: "You created your service !",
//                         type: "success"
//                     });
//                 })
//                 .error(function (response) {
//                     console.log("ModalViewSubmit $http.post error");
//                     console.log(response);
//                 })
//                 .then(function () {
//                     console.log();
//                 });
//         };
//     };
//
//
// });
//
// pcaCtrl.controller('PCAProcessController', function ($scope, $rootScope, PCAProcessService) {
//
//     $scope.processesList = {};
//
//     $rootScope.$on('event:PCAProcessService', function () {
//         $scope.processesList = PCAProcessService.getProcessesList();
//         console.log('event:PCAProcessService');
//     });
//
// });
//
// pcaCtrl.controller('PCARunningServicesController', function ($scope, $rootScope, $http, SweetAlert, PCARunningServicesService) {
//
//     $scope.runningServicesList = {};
//     $scope.PCARunningServicesServiceUrl = PCARunningServicesService.getPCARunningServicesServiceUrl();
//
//     $rootScope.$on('event:PCARunningServicesService', function () {
//         $scope.runningServicesList = PCARunningServicesService.getRunningServicesList();
//         console.log('event:PCARunningServicesService');
//     });
//
//     function deleteRunningService(serviceModel, instanceName, infrastructureName, serviceInstanceId, instanceId) {
//         var payloadParams = {
//             'genericInfo': {
//                 'pca.service.model': serviceModel
//             },
//             'variables': {
//                 'pca.instance.id': serviceInstanceId,
//                 'instance_name': instanceName,
//                 'infrastructure_name': infrastructureName
//             }
//         };
//         var req = {
//             method: 'DELETE',
//             url: JSON.parse(localStorage['pcaServiceUrl']) + 'serviceInstances',
//             headers: {
//                 'content-type': 'application/json',
//                 'sessionid': localStorage['pa.session']
//             },
//             data: payloadParams
//         };
//         console.log('payloadParam:');
//         console.log(angular.toJson(payloadParams, true));
//         console.log('req:');
//         console.log(req);
//         $http(req)
//             .success(function (response) {
//                 console.log("submit OK !!!!!");
//             })
//             .error(function (response) {
//                 console.log("error while submitting variables !!!!!!!");
//                 console.log(response);
//             })
//             .then(function () {
//                 console.log();
//             });
//     };
//
//     $scope.submitDeleteWithConfirmation = function (serviceModel, instanceName, infrastructureName, serviceInstanceId, instanceId) {
//
//         SweetAlert.swal({
//                 title: "Are you sure?",
//                 text: "You are going to delete a service !",
//                 type: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#DD6B55",
//                 confirmButtonText: "Delete",
//                 cancelButtonText: "Cancel",
//                 closeOnConfirm: false,
//                 closeOnCancel: true
//             },
//             function (isConfirm) {
//                 if (isConfirm) {
//                     deleteRunningService(serviceModel, instanceName, infrastructureName, serviceInstanceId, instanceId);
//                     SweetAlert.swal("Deleted !", "That service won't bother you anymore", "success");
//                 }
//             });
//     };
//
// });
//
//
// pcaCtrl.controller('loginController', function ($scope, $state, SchedulerService, PCACatalogService, PCAProcessService, PCARunningServicesService, PCANodeSourcesService) {
//
//     $scope.login = function () {
//         var username = $scope.username;
//         var password = $scope.password;
//
//         localStorage['pa.username'] = username;
//         $scope.main.userName = localStorage['pa.username'];
//
//         SchedulerService.doLogin(username, password)
//             .success(function (response) {
//                 var sessionid = localStorage['pa.session'];
//                 console.log("loginController pa.session " + sessionid);
//                 if (!angular.equals(sessionid, "null")) {
//                     console.log("loginController logged");
//
//                     // Redirect to the main page
//                     $state.go('portal.main');
//
//                     // Start PCA refreshing services
//                     SchedulerService.refreshSchedulerService();
//                     PCACatalogService.refreshPCACatalogService();
//                     PCAProcessService.refreshPCAProcessService();
//                     PCARunningServicesService.refreshPCARunningServicesService();
//
//                     // Get existing Node Sources
//                     PCANodeSourcesService.getNodeSourceList();
//                 }
//             })
//             .error(function (response) {
//                 console.log("loginController error doLogin");
//             });
//     };
// });
//
// pcaCtrl.controller('logoutController', function ($rootScope, $scope, $state) {
//     $scope.logout = function () {
//         localStorage['pa.session'] = "null";
//         console.log("pa.session set to null");
//
//         // Stop all PCA refreshing services
//         $rootScope.$broadcast('event:StopRefreshing');
//         console.log("event:StopRefreshing emitted");
//
//         $state.go('login');
//     };
// });
