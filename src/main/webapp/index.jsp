<%--
  Created by IntelliJ IDEA.
  User: Sophie
  Date: 16/8/8
  Time: PM2:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ProActive Notification Service</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="./image/vnd.microsoft.icon"
          href="./images/favicon.ico">
    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="./libs/codemirror/lib/codemirror.css" />
    <link rel="stylesheet" href="./libs/bootstrap/dist/css/bootstrap.min.css" />
    <!-- endbower -->
    <link href="./libs/pnotify/dist/pnotify.css" rel="stylesheet" type="text/css" />
    <link href="./libs/pnotify/dist/pnotify.buttons.css" rel="stylesheet" type="text/css" />
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/studio.css -->
    <link rel="stylesheet" href="style/notification.css">
    <link href="styles/animate.css" rel="stylesheet">
    <link href="styles/style.css" rel="stylesheet">
  </head>

  <body style="padding-top: 120px">
  <div id="navbar-fixed" class="navbar navbar-default navbar-fixed-top " role="navigation">

    <div class="navbar navbar-default" style="min-width:100%;">
      <icons class="flex-center">
        <div>
          <a class="navbar-brand no-padding"><img src="./images/proactive_32.png" style="height:40px">ProActive Notification Service</a>
        </div>
        <div>
          <a href="http://activeeon.com/" target="_blank" class="navbar-brand no-padding pull-right"><img src="./images/AE-Logo.png" style="height:40px"></a>
        </div>
      </icons>
    </div>

    <div class="row-right border-bottom">
      <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">

        <ul class="nav navbar-nav navbar-right">
          <li style="padding-right: 12px; padding-bottom: 6px">
            <div>
              <a class="btn btn-small btn-default" href="/studio" target="_blank" style="color:#333;border-color: #ccc"><img src="styles/patterns/studio_30.png" style="height:25px;padding-right:10px">Workflow Studio</a>
            </div>
          </li>
          <li style="padding-right: 12px; padding-bottom: 6px">
            <div>
              <a class="btn btn-small btn-default" href="/scheduler" target="_blank" style="color:#333;border-color: #ccc"><img src="styles/patterns/scheduler_30.png" style="height:25px;padding-right:10px">Scheduling &amp; Orchestration</a>
            </div>
          </li>
          <li style="padding-right: 0px; padding-bottom: 6px">
            <div>
              <a class="btn btn-small btn-default" href="/rm" target="_blank" style="color:#333;border-color: #ccc"><img src="styles/patterns/rm_30.png" style="height:25px;padding-right:10px">Resource Manager</a>
            </div>
          </li>

          <li style="height: 50px;margin: 0 5px;border-right: 1px solid #ffffff;border-left: 1px solid #f2f2f2;"></li>

        </ul>
      </nav>
    </div>
  </div>

  <div id="wrapper" style="background-color: #f47932">
    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="sidebar-collapse">
        <ul side-navigation class="nav metismenu" id="side-menu">

          <li ui-sref-active="active">
            <a ui-sref="portal.main"  style="background-color: #002d66"><img src="images/dashboard.png" style="height:25px;padding-right:10px"> <span class="nav-label">Dashboard</span> </a>
          </li>

          <li ui-sref-active="active" >
            <a ui-sref="#" style="background-color: #002d66"><img src="images/request.png" style="height:25px;padding-right:10px">  <span class="nav-label">Notifications</span></a>
          </li>

          <li ui-sref-active="active" >
            <a ui-sref="#" style="background-color: #002d66"><img src="images/request.png" style="height:25px;padding-right:10px">  <span class="nav-label">Requests</span></a>
          </li>
        </ul>

      </div>
    </nav>
    <div id="page-wrapper" class="gray-bg {{$state.current.name}}">

      <!-- Main view  -->
      <div ui-view></div>
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="col-lg-6">
          <div class="ibox float-e-margins">
            <div class="ibox-heading">
              <h1>Notification Service</h1>
            </div>
            <div class="ibox-content">
              <div class="input-group m-b col-sm-6">
                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" placeholder="Search" class="form-control" ng-model="search">
              </div>
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Time</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <td>${date}</td>
                <td>${description}</td>
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>

      <!-- Footer -->
      <div ng-include="'views/common/footer.html'"></div>

    </div>

  </div>



  </body>
</html>


<!DOCTYPE html>
<html lang="en">
