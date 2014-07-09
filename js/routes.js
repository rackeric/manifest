"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl',
         label: 'Home'
      });

      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl',
         label: 'Chat'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl',
         label: 'Account'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.when('/projects', {
         authRequired: true,
         templateUrl: 'partials/project.html',
         controller: 'ProjectCtrl',
         tabel: 'Projects'
      });
      
      //  START ANSIBLE SECTION
      $routeProvider.when('/projects/Ansible/:projectId', {
          authRequired: true,
          templateUrl: 'partials/ansible-project-details.html',
          controller: 'AnsibleProjectDetailsCtrl',
          label: 'Ansible Project'
      });
      
      $routeProvider.when('/projects/Ansible/:projectId/roles/:roleId', {
          authRequired: true,
          templateUrl: 'partials/ansible-role-details.html',
          controller: 'AnsibleRoleDetailsCtrl',
          label: 'Playbook'
      });
      $routeProvider.when('/projects/Ansible/:projectId/rolesmanual/:roleId', {
          authRequired: true,
          templateUrl: 'partials/ansible-rolemanual-details.html',
          controller: 'AnsibleRoleManualDetailsCtrl',
          label: 'Manual Playbook'
      });
      //  END ANSIBLE SECTION
      
      //  START SALT SECTION
      $routeProvider.when('/projects/Salt/:projectId', {
          authRequired: true,
          templateUrl: 'partials/salt-project-details.html',
          controller: 'SaltProjectDetailsCtrl',
          label: 'Salt Project'
      });
      
      $routeProvider.when('/projects/Salt/:projectId/roles/:roleId', {
          authRequired: true,
          templateUrl: 'partials/salt-role-details.html',
          controller: 'SaltRoleDetailsCtrl',
          label: 'Role Details'
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
         controller: 'AdminCtrl',
         label: 'Admin'
      });
      
      $routeProvider.when('/ansiblemodulelist', {
         authRequired: true,
         templateUrl: 'partials/ansiblemodulelist.html',
         controller: 'AnsibleModuleListCtrl'
      });
      
      $routeProvider.when('/ansiblecloudmodulelist', {
         authRequired: true,
         templateUrl: 'partials/ansiblecloudmodulelist.html',
         controller: 'AnsibleCloudModuleListCtrl'
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
         controller: 'RepositoryCtrl',
         label: 'Repository'
      });
      
      $routeProvider.when('/repository/:roleId', {
         templateUrl: 'partials/ansiblePublicDetails.html',
         controller: 'AnsiblePublicDetailsCtrl',
         label: 'Ansible Public Details'
      });
      
      $routeProvider.when('/GettingStartedAnsible', {
         templateUrl: 'partials/GettingStartedAnsible.html',
         controller: 'GettingStartedAnsible',
         label: 'Getting Started Ansible'
      });
      
      $routeProvider.otherwise({redirectTo: '/home'});
   }]);