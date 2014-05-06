"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.when('/projects', {
         authRequired: true,
         templateUrl: 'partials/project.html',
         controller: 'ProjectCtrl'
      });
      
      //  START ANSIBLE SECTION
      $routeProvider.when('/projects/Ansible/:projectId', {
          authRequired: true,
          templateUrl: 'partials/ansible-project-details.html',
          controller: 'AnsibleProjectDetailsCtrl'
      });
      
      $routeProvider.when('/projects/Ansible/:projectId/roles/:roleId', {
          authRequired: true,
          templateUrl: 'partials/ansible-role-details.html',
          controller: 'AnsibleRoleDetailsCtrl'
      });
      //  END ANSIBLE SECTION
      
      //  START SALT SECTION
      $routeProvider.when('/projects/Salt/:projectId', {
          authRequired: true,
          templateUrl: 'partials/salt-project-details.html',
          controller: 'SaltProjectDetailsCtrl'
      });
      
      $routeProvider.when('/projects/Salt/:projectId/roles/:roleId', {
          authRequired: true,
          templateUrl: 'partials/salt-role-details.html',
          controller: 'SaltRoleDetailsCtrl'
      });
      //  END SALT SECTION

      //$routeProvider.when('/projects/:projectId', {
        // templateUrl: 'partials/project-details.html',
        // controller: 'ProjectDetailsCtrl'
      //});

      //$routeProvider.when('/projects/:projectId/roles/:roleId', {
        // templateUrl: 'partials/role-details.html',
        // controller: 'RoleDetailsCtrl'
      //});

      $routeProvider.when('/poof', {
         authRequired: true,
         templateUrl: 'partials/admin.html',
         controller: 'AdminCtrl'
      });
      
      $routeProvider.when('/ansiblemodulelist', {
         authRequired: true,
         templateUrl: 'partials/ansiblemodulelist.html',
         controller: 'AnsibleModuleListCtrl'
      });
      
      $routeProvider.when('/ansibleinventoryoptions', {
         authRequired: true,
         templateUrl: 'partials/ansibleinventoryoptions.html',
         controller: 'AnsibleInventoryOptionsCtrl'
      });
      
      $routeProvider.when('/saltmodulelist', {
         authRequired: true,
         templateUrl: 'partials/saltmodulelist.html',
         controller: 'SaltModuleListCtrl'
      });
      
      $routeProvider.when('/repository', {
         templateUrl: 'partials/repository.html',
         controller: 'RepositoryCtrl'
      });
      
      $routeProvider.when('/testing', {
         templateUrl: 'partials/testing.html',
         controller: 'TestingCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);