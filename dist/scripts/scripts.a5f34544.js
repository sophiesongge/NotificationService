function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/login"),$stateProvider.state("login",{url:"/login",templateUrl:"views/login.html",authenticate:!1}).state("portal",{"abstract":!0,url:"/portal",templateUrl:"views/common/content.html",authenticate:!0}).state("portal.main",{url:"/main",templateUrl:"views/main.html",data:{pageTitle:"Portal"},authenticate:!0}).state("portal.minor",{url:"/minor",templateUrl:"views/minor.html",data:{pageTitle:"Example view"},authenticate:!0})}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="ProActive Cloud Automation";toState.data&&toState.data.pageTitle&&(title="ProActive Cloud Automation | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()})}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.find("div.ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary" style="color: #002d66" href="" ng-click="minimalize()" ><i class="fa fa-bars" style="color: #002d66"></i></a>',controller:function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools_full_screen.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.find("div.ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}function MainCtrl(){this.userName=localStorage["pa.username"],this.helloText="Welcome in SeedProject",this.descriptionText="It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects."}$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeigh=$("nav.navbar-default").height(),wrapperHeigh=$("#page-wrapper").height();navbarHeigh>wrapperHeigh&&$("#page-wrapper").css("min-height",navbarHeigh+"px"),wrapperHeigh>navbarHeigh&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeigh>wrapperHeigh?$("#page-wrapper").css("min-height",navbarHeigh-60+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(function(){$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")})});var pcaCtrl=angular.module("pca-rest",["ngResource","spring-data-rest","angular-toArrayFilter","oitozero.ngSweetAlert"]);pcaCtrl.value("pcaServiceUrl",null).value("schedulerRestUrl",null),pcaCtrl.filter("getByKey",function(){return function(propertyName,collection){for(var len=collection.length,value="",i=0;len>i;i++)collection[i].key==propertyName&&(value=collection[i].value);return value}}),pcaCtrl.factory("LoadingPropertiesService",function($http){return console.log("LoadingPropertiesService factory"),$http.get("resources/pcaportal.properties").success(function(response){pcaServiceUrl=angular.toJson(response.pcaServiceUrl,!0),schedulerRestUrl=angular.toJson(response.schedulerRestUrl,!0),localStorage.pcaServiceUrl=angular.toJson(response.pcaServiceUrl,!0),localStorage.schedulerRestUrl=angular.toJson(response.schedulerRestUrl,!0),console.log("LoadingPropertiesService pcaServiceUrl set to ",pcaServiceUrl),console.log("LoadingPropertiesService schedulerRestUrl set to ",schedulerRestUrl)}).error(function(response){console.error("LoadingPropertiesService $http.get error",status,response)}),{doNothing:function(){return null}}}),pcaCtrl.factory("SchedulerService",function($http,$rootScope,SpringDataRestAdapter,LoadingPropertiesService,$interval){function doLogin(userName,userPass){var authData=$.param({username:userName,password:userPass}),authConfig={headers:{"Content-Type":"application/x-www-form-urlencoded"},transformResponse:[]};return $http.post(JSON.parse(localStorage.schedulerRestUrl)+"login",authData,authConfig).success(function(response){response.match(/^[A-Za-z0-9]+$/)?(localStorage["pa.session"]=response,console.log("SchedulerService.doLogin authentification succeed "+response)):console.log("SchedulerService.doLogin authentification failed "+response)}).error(function(response){console.error("SchedulerService.doLogin authentification error",status,response)})}function getSchedulerService(){if(!angular.equals(localStorage["pa.session"],"null")){console.log("getSchedulerService while user connected with "+localStorage["pa.session"]);var scopeProcessedResponse,jobsInfoConfig={headers:{sessionid:localStorage["pa.session"]}},schedulerRestUrl=JSON.parse(localStorage.schedulerRestUrl);console.log("SchedulerService.getSchedulerService http.get url : "+schedulerRestUrl+"jobsinfo"),console.log("SchedulerService.getSchedulerService http.get config : "+angular.toJson(jobsInfoConfig,!0));var httpPromise=$http.get(schedulerRestUrl+"jobsinfo",jobsInfoConfig).success(function(response){}).error(function(response){console.error("SchedulerService.getSchedulerService $http.get error",status,response)});SpringDataRestAdapter.process(httpPromise).then(function(processedResponse){scopeProcessedResponse=angular.toJson(processedResponse,!0),jobList=processedResponse.list;var pendingJobs=$.grep(jobList,function(n,i){return"PENDING"===n.jobInfo.status});nbPendingRequests=pendingJobs.length,nbTotalProcesses=jobList.length;var runningJobs=$.grep(jobList,function(n,i){return"RUNNING"===n.jobInfo.status});nbRunningProcesses=runningJobs.length,$rootScope.$broadcast("event:SchedulerService")})}}function refreshSchedulerService(){var intervalPromise=$rootScope.$interval(getSchedulerService,SchedulerServiceRefreshTime);$rootScope.$on("event:StopRefreshing",function(){console.log("event:StopRefreshing for refreshSchedulerService received"),angular.isDefined(intervalPromise)&&($interval.cancel(intervalPromise),intervalPromise=void 0)})}localStorage["pa.session"]="null";var SchedulerServiceRefreshTime=2e3,jobList=[],nbPendingRequests=0,nbTotalProcesses=0,nbRunningProcesses=0;return{getJobList:function(){return jobList},getNbPendingRequests:function(){return nbPendingRequests},getNbTotalProcesses:function(){return nbTotalProcesses},getNbRunningProcesses:function(){return nbRunningProcesses},doLogin:function(userName,userPass){return doLogin(userName,userPass)},isConnected:function(){return!angular.equals(localStorage["pa.session"],"null")},refreshSchedulerService:function(){return refreshSchedulerService()}}}),pcaCtrl.factory("CatalogService",function($http,$rootScope,SpringDataRestAdapter){var workflowMetadataList,nbServices;return{getWorkflowMetadataList:function(){return workflowMetadataList},getNbServices:function(){return nbServices}}}),pcaCtrl.factory("IaaSConnectorService",function($rootScope,$http,SpringDataRestAdapter){var runningServices,nbRunningServices=0;return{getNbRunningServices:function(){return nbRunningServices},getRunningServices:function(){return runningServices}}}),pcaCtrl.factory("PCACatalogService",function($rootScope,$http,SpringDataRestAdapter,$interval){function getPCACatalogService(){console.log("PCACatalogService.getPCACatalogService http.get url : "+PCACatalogServiceUrl);var httpPromise=$http.get(PCACatalogServiceUrl).success(function(response){}).error(function(response){console.error("PCACatalogService.getPCACatalogService http.get error",status,response)});SpringDataRestAdapter.process(httpPromise).then(function(processedResponse){servicesList=processedResponse._embeddedItems,nbServices=processedResponse.page.totalElements,$rootScope.$broadcast("event:PCACatalogService")})}function refreshPCACatalogService(){var intervalPromise=$rootScope.$interval(getPCACatalogService,PCACatalogServiceRefreshTime);$rootScope.$on("event:StopRefreshing",function(){console.log("event:StopRefreshing for refreshPCACatalogService received"),angular.isDefined(intervalPromise)&&($interval.cancel(intervalPromise),intervalPromise=void 0)})}var PCACatalogServiceUrl=JSON.parse(localStorage.pcaServiceUrl)+"catalog/services",PCACatalogServiceRefreshTime=2e3,servicesList=[],nbServices=0;return{getServicesList:function(){return servicesList},getNbServices:function(){return nbServices},refreshPCACatalogService:function(){return refreshPCACatalogService()}}}),pcaCtrl.factory("PCAProcessService",function($rootScope,$http,$interval){function getPCAProcessService(){processesList={"id-ABC":{team:"admin",processName:"create spark instance",processStatus:"RUNNING"},"id-DEF":{team:"paraita",processName:"create openstack instance",processStatus:"RUNNING"}},$rootScope.$broadcast("event:PCAProcessService")}function refreshPCAProcessService(){var intervalPromise=$rootScope.$interval(getPCAProcessService,PCAProcessServiceRefreshTime);$rootScope.$on("event:StopRefreshing",function(){console.log("event:StopRefreshing for refreshPCAProcessService received"),angular.isDefined(intervalPromise)&&($interval.cancel(intervalPromise),intervalPromise=void 0)})}var PCAProcessServiceRefreshTime=(JSON.parse(localStorage.pcaServiceUrl)+"TO-BE-DETERMINED",2e3),processesList={};return{getProcessesList:function(){return processesList},refreshPCAProcessService:function(){return refreshPCAProcessService}}}),pcaCtrl.factory("PCANodeSourcesService",function($rootScope,$http,$interval){function getNodeSourceList(variable){var req={method:"GET",url:JSON.parse(localStorage.pcaServiceUrl)+"rm/nodesourcesName",headers:{"content-type":"application/json",sessionid:localStorage["pa.session"]}};$http(req).success(function(response){console.log(response),existingNodeSourceList=response}).error(function(response){console.log("error while getting getNodeSourceList !!!!!!!"),console.log(response)}).then(function(){console.log()})}var existingNodeSourceList=[];return{getExistingNodeSourceList:function(){return existingNodeSourceList},getNodeSourceList:function(){return getNodeSourceList()}}}),pcaCtrl.factory("PCARunningServicesService",function($rootScope,$http,$interval){function getPCARunningServicesService(){console.log("PCARunningServicesService.getPCARunningServicesService http.get url : "+PCARunningServicesServiceUrl),$http.get(PCARunningServicesServiceUrl).success(function(response){runningServicesList=response;var keys=Object.keys(runningServicesList);nbRunningServices=keys.length,console.log("PCARunningServicesService.getPCARunningServicesService http.get success "+angular.toJson(response,!0)),$rootScope.$broadcast("event:PCARunningServicesService")}).error(function(response){console.error("PCARunningServicesService.getPCARunningServicesService http.get error",status,response)}),$rootScope.$broadcast("event:PCARunningServicesService")}function refreshPCARunningServicesService(){var intervalPromise=$rootScope.$interval(getPCARunningServicesService,PCARunningServicesServiceRefreshTime);$rootScope.$on("event:StopRefreshing",function(){console.log("event:StopRefreshing for refreshPCARunningServicesService received"),angular.isDefined(intervalPromise)&&($interval.cancel(intervalPromise),intervalPromise=void 0)})}var PCARunningServicesServiceUrl=JSON.parse(localStorage.pcaServiceUrl)+"serviceInstances",PCARunningServicesServiceRefreshTime=2e3,runningServicesList={},nbRunningServices=0;return{getRunningServicesList:function(){return runningServicesList},getPCARunningServicesServiceUrl:function(){return PCARunningServicesServiceUrl},getNbRunningServices:function(){Object.keys(runningServicesList);return nbRunningServices},refreshPCARunningServicesService:function(){return refreshPCARunningServicesService()}}}),pcaCtrl.controller("SchedulerController",function($scope,$rootScope,$http,SpringDataRestAdapter,SchedulerService){$scope.jobsList=[],$rootScope.$on("event:SchedulerService",function(){$scope.jobsList=SchedulerService.getJobList()})}),pcaCtrl.controller("MonitoringController",function($scope,$rootScope,$http,SpringDataRestAdapter,SchedulerService,PCACatalogService,PCARunningServicesService){$scope.nbPendingRequests=0,$scope.nbTotalProcesses=0,$scope.nbRunningServices=0,$scope.nbRunningProcesses=0,$scope.nbServices=0,$rootScope.$on("event:SchedulerService",function(){console.log("event:SchedulerService"),$scope.nbPendingRequests=SchedulerService.getNbPendingRequests(),$scope.nbTotalProcesses=SchedulerService.getNbTotalProcesses(),$scope.nbRunningProcesses=SchedulerService.getNbRunningProcesses()}),$rootScope.$on("event:PCARunningServicesService",function(){console.log("event:PCARunningServicesService "+PCARunningServicesService.getNbRunningServices()),$scope.nbRunningServices=PCARunningServicesService.getNbRunningServices()}),$rootScope.$on("event:PCACatalogService",function(){console.log("event:PCACatalogService "+PCACatalogService.getNbServices()),$scope.nbServices=PCACatalogService.getNbServices()})}),pcaCtrl.controller("PCACatalogController",function($scope,$rootScope,$uibModal,$http,$filter,PCACatalogService,PCANodeSourcesService){function ModalViewSubmit($scope,$uibModalInstance,SweetAlert,workflowToSubmit){$scope.workflow=workflowToSubmit,$scope.ok=function(modifiedWorkflow){$scope.submit(modifiedWorkflow)},$scope.cancel=function(){$uibModalInstance.dismiss("cancel")},$scope.submit=function(modifiedWorkflow){console.log("Workflow to submit for creation:"),console.log(modifiedWorkflow);var variables={};angular.forEach(modifiedWorkflow.variables,function(item){item.value.startsWith("#{")||item.value.startsWith("${")?variables[item.key]=modifiedWorkflow.newvariables[item.key].value:variables[item.key]=item.value});var payloadParams={variables:variables,genericInfo:{"pca.service.model":$filter("getByKey")("pca.service.model",modifiedWorkflow.generic_information),"pca.service.name":$filter("getByKey")("pca.service.name",modifiedWorkflow.generic_information)}},configHeaders={headers:{"content-type":"application/json",sessionid:localStorage["pa.session"]}},pcaServiceUrl=JSON.parse(localStorage.pcaServiceUrl);console.log("ModalViewSubmit http.post url : "+pcaServiceUrl+"serviceInstances"),console.log("ModalViewSubmit http.post data "+angular.toJson(payloadParams,!0)),console.log("ModalViewSubmit http.post config "+angular.toJson(configHeaders,!0)),$http.post(pcaServiceUrl+"serviceInstances",payloadParams,configHeaders).success(function(response){console.log("ModalViewSubmit $http.post success"),$uibModalInstance.close(),SweetAlert.swal({title:"Good job!",text:"You created your service !",type:"success"})}).error(function(response){console.log("ModalViewSubmit $http.post error"),console.log(response)}).then(function(){console.log()})}}$scope.servicesList=[],$scope.listOfNS=function(){return console.log(PCANodeSourcesService.getExistingNodeSourceList()),PCANodeSourcesService.getExistingNodeSourceList()},$rootScope.$on("event:PCACatalogService",function(){$scope.servicesList=PCACatalogService.getServicesList(),console.log("event:PCACatalogService")}),$scope.findImageUrl=function(selectedWorkflow){return $filter("getByKey")("pca.action.icon",selectedWorkflow.generic_information)},$scope.showSubmitWorkflowModal=function(selectedWorkflow){$uibModal.open({templateUrl:"views/common/submit_window.html",controller:ModalViewSubmit,windowClass:"animated fadeIn",resolve:{workflowToSubmit:function(){return selectedWorkflow}}})}}),pcaCtrl.controller("PCAProcessController",function($scope,$rootScope,PCAProcessService){$scope.processesList={},$rootScope.$on("event:PCAProcessService",function(){$scope.processesList=PCAProcessService.getProcessesList(),console.log("event:PCAProcessService")})}),pcaCtrl.controller("PCARunningServicesController",function($scope,$rootScope,$http,SweetAlert,PCARunningServicesService){function deleteRunningService(serviceModel,instanceName,infrastructureName,serviceInstanceId,instanceId){var payloadParams={genericInfo:{"pca.service.model":serviceModel},variables:{"pca.instance.id":serviceInstanceId,instance_name:instanceName,infrastructure_name:infrastructureName}},req={method:"DELETE",url:JSON.parse(localStorage.pcaServiceUrl)+"serviceInstances",headers:{"content-type":"application/json",sessionid:localStorage["pa.session"]},data:payloadParams};console.log("payloadParam:"),console.log(angular.toJson(payloadParams,!0)),console.log("req:"),console.log(req),$http(req).success(function(response){console.log("submit OK !!!!!")}).error(function(response){console.log("error while submitting variables !!!!!!!"),console.log(response)}).then(function(){console.log()})}$scope.runningServicesList={},$scope.PCARunningServicesServiceUrl=PCARunningServicesService.getPCARunningServicesServiceUrl(),$rootScope.$on("event:PCARunningServicesService",function(){$scope.runningServicesList=PCARunningServicesService.getRunningServicesList(),console.log("event:PCARunningServicesService")}),$scope.submitDeleteWithConfirmation=function(serviceModel,instanceName,infrastructureName,serviceInstanceId,instanceId){SweetAlert.swal({title:"Are you sure?",text:"You are going to delete a service !",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Delete",cancelButtonText:"Cancel",closeOnConfirm:!1,closeOnCancel:!0},function(isConfirm){isConfirm&&(deleteRunningService(serviceModel,instanceName,infrastructureName,serviceInstanceId,instanceId),SweetAlert.swal("Deleted !","That service won't bother you anymore","success"))})}}),pcaCtrl.controller("loginController",function($scope,$state,SchedulerService,PCACatalogService,PCAProcessService,PCARunningServicesService,PCANodeSourcesService){$scope.login=function(){var username=$scope.username,password=$scope.password;localStorage["pa.username"]=username,$scope.main.userName=localStorage["pa.username"],SchedulerService.doLogin(username,password).success(function(response){var sessionid=localStorage["pa.session"];console.log("loginController pa.session "+sessionid),angular.equals(sessionid,"null")||(console.log("loginController logged"),$state.go("portal.main"),SchedulerService.refreshSchedulerService(),PCACatalogService.refreshPCACatalogService(),PCAProcessService.refreshPCAProcessService(),PCARunningServicesService.refreshPCARunningServicesService(),PCANodeSourcesService.getNodeSourceList())}).error(function(response){console.log("loginController error doLogin")})}}),pcaCtrl.controller("logoutController",function($rootScope,$scope,$state){$scope.logout=function(){localStorage["pa.session"]="null",console.log("pa.session set to null"),$rootScope.$broadcast("event:StopRefreshing"),console.log("event:StopRefreshing emitted"),$state.go("login")}}),function(){angular.module("inspinia",["ui.router","ui.bootstrap","pca-rest"])}(),angular.module("inspinia").config(config).run(function($rootScope,$state,$interval){$rootScope.$state=$state,$rootScope.$interval=$interval}),angular.module("inspinia").config(function($httpProvider){$httpProvider.defaults.headers.common={},$httpProvider.defaults.headers.post={},$httpProvider.defaults.headers.put={},$httpProvider.defaults.headers.patch={},$httpProvider.defaults.headers.get={},$httpProvider.defaults.useXDomain=!0,delete $httpProvider.defaults.headers.common["X-Requested-With"]}),angular.module("inspinia").run(function($rootScope,$state,SchedulerService){$rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){console.log("authentification required? "+toState.authenticate+" logged? "+SchedulerService.isConnected()),toState.authenticate&&!SchedulerService.isConnected()&&$state.go("login")})}),angular.module("inspinia").directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("iboxTools",iboxTools).directive("minimalizaSidebar",minimalizaSidebar).directive("iboxToolsFullScreen",iboxToolsFullScreen),angular.module("inspinia").controller("MainCtrl",MainCtrl);