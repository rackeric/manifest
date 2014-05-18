'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('TestingCtrl', ['$scope', 'syncData', '$http', function($scope, syncData, $http) {
      
      $scope.external_data = syncData('external_data');
      
      $scope.ansibleJeneric = function(host_list, module_name, module_args, pattern, remote_user, remote_pass, private_key_file) {
          $scope.code = null;
          $scope.response = null;
          $scope.job_id = null;
          
          $scope.external_data.$add({ status: "QUEUED", host_list: host_list,
                                                        module_name: module_name, 
                                                        module_args: module_args, 
                                                        pattern: pattern, 
                                                        remote_user: remote_user, 
                                                        remote_pass: remote_pass,
                                                        private_key_file: private_key_file }).then(function(ref) {
              // the key of the new job = job_id
              
              $scope.myURL = 'http://destiny.cloudmanifest.com:8000/ansible_jeneric_testing/' + ref.name();
          
              $http({method: 'GET', url: $scope.myURL}).
                success(function(data, status) {
                  $scope.status = status;
                  $scope.data = data;
                }).
                error(function(data, status) {
                  $scope.data = data || "Request failed";
                  $scope.status = status;
              });
          });
      }
      
      $scope.clear = function() {
          $scope.external_data.$remove();
      }
      
  }])


  .controller('foot', ['$scope', '$location', 'syncData', 'serviceFeedbacklist', function($scope, $location, syncData, serviceFeedbacklist) {
      
      console.log("FOOTER CONTROLLER ------>>>>");
      
      // sync the feedback list from firebase
      //$scope.feedbacklist = syncData('feedbacklist');
      // 3-way data bind below break shit
      //serviceFeedbacklist.$bind($scope, "feedbacklist");
      $scope.feedbacklist = serviceFeedbacklist;
      
      $scope.submitFeedback = function() {
          console.log("ENTERING submitFeedback()");
          
          // format a date for timestamp
          var now = new Date();
          var year = now.getFullYear();
          var month = now.getMonth();
          var date = now.getDate();
          var date = year + "-" + month + "-" + date;
          
          $scope.feedbacklist.$add({
              user_id: $scope.auth.user.uid,
              user_email: $scope.auth.user.email,
              page: $location.path(),
              feedback: $scope.feedback,
              status: "new",
              date: date
          })
          
          $scope.feedback = null;
      }
      
  }])

  .controller('RepositoryCtrl', ['$scope', 'syncData', '$http', function($scope, syncData, $http) {
      // nothing yet
      $scope.external_data = syncData('external_data');
      
      $scope.uptime = function() {
          $scope.code = null;
          $scope.response = null;
        
          $http({method: 'GET', url: 'http://destiny.cloudmanifest.com:8000/ansible_test1/'}).
            success(function(data, status) {
              $scope.status = status;
              $scope.data = data;
            }).
            error(function(data, status) {
              $scope.data = data || "Request failed";
              $scope.status = status;
          });
      }
      
      $scope.df = function() {
          $scope.code = null;
          $scope.response = null;
        
          $http({method: 'GET', url: 'http://destiny.cloudmanifest.com:8000/ansible_test2/'}).
            success(function(data, status) {
              $scope.status = status;
              $scope.data = data;
            }).
            error(function(data, status) {
              $scope.data = data || "Request failed";
              $scope.status = status;
          });
      }
      
      $scope.command_run = function() {
          $scope.code = null;
          $scope.response = null;
          $scope.job_id = null;
          
          $scope.external_data.$add({ status: "QUEUED", host: $scope.host_to_run_on, command: $scope.command_to_run }).then(function(ref) {
              // the key of the new job = job_id
              
              $scope.myURL = 'http://destiny.cloudmanifest.com:8000/ansible_command_run/' + ref.name();
          
              $http({method: 'GET', url: $scope.myURL}).
                success(function(data, status) {
                  $scope.status = status;
                  $scope.data = data;
                }).
                error(function(data, status) {
                  $scope.data = data || "Request failed";
                  $scope.status = status;
              });
          });
      }
      
      $scope.clear = function() {
          $scope.external_data.$remove();
      }
      
  }])

  .controller('AdminCtrl', ['$scope', 'syncData', 'serviceFeedbacklist', 'serviceUserlist', function($scope, syncData, serviceFeedbacklist, serviceUserlist) {
      // sync the feedback list
      //$scope.feedbacklist = syncData('feedbacklist');
      //serviceFeedbacklist.$bind($scope, "feedbacklist");
      $scope.feedbacklist = serviceFeedbacklist;
      
      // sync users for users list
      $scope.userslist = syncData('users');
      //$scope.userlist = serviceUserlist;
      //serviceUserlist.$bind($scope, "userlist");
      
      // remove feedback item
    	$scope.removeFeedback = function(key) {
    	  var deleteFeedback = confirm('Are you absolutely sure you want to delete?');
          if (deleteFeedback) {
          //alert('Going to delete the user');
          $scope.feedbacklist.$remove(key);
          }
    	}

  }])
  
  
  .controller('AnsibleInventoryOptionsCtrl', ['$scope', 'syncData', function($scope, syncData) {
    $scope.ansibleinventoryoptions = syncData('hostoptions/ansible');
    $scope.choices = [];

    // insert module to db
    $scope.addToModulesList = function() {
    $scope.ansibleinventoryoptions.$add({
                                name: $scope.newOptionName,
                                description: $scope.newOptionDescription
    })
    $scope.newOptionName = null;
    $scope.newOptionDescription = null;
    $scope.newModuleCategory = null;
    $scope.choices = [];
    }

    // remove text field
    $scope.removeChoice = function() {
      $scope.choices.pop();
    }
    // add text field
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({});
    };
    // the other thing
    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };
    // show choice lable
    $scope.showChoiceLabel = function (choice) {
      return choice.id === $scope.choices[0].id;
    }
    
    // remove ansible module
	$scope.removeModule = function(key) {
	  var deleteModule = confirm('Are you absolutely sure you want to delete?');
      if (deleteModule) {
      //alert('Going to delete the user');
      $scope.moduleslist.$remove(key);
      }
	}
    
  }])
  
  
  .controller('AnsibleModuleListCtrl', ['$scope', 'syncData', function($scope, syncData) {
    $scope.moduleslist = syncData('moduleslist/ansible');
    $scope.choices = [];

    // insert module to db
    $scope.addToModulesList = function() {
    $scope.moduleslist.$add({
                                name: $scope.newModuleName,
                                description: $scope.newModuleDescription,
                                category: $scope.newModuleCategory,
                                options: $scope.choices
    })
    $scope.newModuleName = null;
    $scope.newModuleDescription = null;
    $scope.newModuleCategory = null;
    $scope.choices = [];
    }

    // remove text field
    $scope.removeChoice = function() {
      $scope.choices.pop();
    }
    // add text field
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({});
    };
    // the other thing
    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };
    // show choice lable
    $scope.showChoiceLabel = function (choice) {
      return choice.id === $scope.choices[0].id;
    }
    
    // remove ansible module
	$scope.removeModule = function(key) {
	  var deleteModule = confirm('Are you absolutely sure you want to delete?');
      if (deleteModule) {
      //alert('Going to delete the user');
      $scope.moduleslist.$remove(key);
      }
	}
    
  }])
  
  .controller('SaltModuleListCtrl', ['$scope', 'syncData', function($scope, syncData) {
    $scope.moduleslist = syncData('moduleslist/salt');
    $scope.choices = [];

    // insert module to db
    $scope.addToModulesList = function() {
    $scope.moduleslist.$add({
                                name: $scope.newModuleName,
                                description: $scope.newModuleDescription,
                                category: $scope.newModuleCategory,
                                options: $scope.choices
    })
    $scope.newModuleName = null;
    $scope.newModuleDescription = null;
    $scope.newModuleCategory = null;
    $scope.choices = [];
    }

    // remove text field
    $scope.removeChoice = function() {
      $scope.choices.pop();
    }
    // add text field
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({});
    };
    // the other thing
    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };
    // show choice lable
    $scope.showChoiceLabel = function (choice) {
      return choice.id === $scope.choices[0].id;
    }
    
    // remove salt module
	$scope.removeModule = function(key) {
	  var deleteModule = confirm('Are you absolutely sure you want to delete?');
      if (deleteModule) {
      //alert('Going to delete the user');
      $scope.moduleslist.$remove(key);
      }
	}
    
  }])

  .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
    var newWidth = 600 + slides.length;

    slides.push({
      image: 'http://lorempixel.com/1200/600/abstract/1/',
      text: "another slide"
    });
    slides.push({
        image: 'http://lorempixel.com/1200/600/abstract/1/',
        text: "yet another slide"
      })
    };
    $scope.addSlide();
  }])

  .controller('ProjectCtrl', ['$scope', '$http', '$routeParams', 'syncData', 'serviceProjects', function($scope, $http, $routeParams, syncData, serviceProjects) {
    $scope.newProject = null;
    
    // types
    $scope.types = ['Ansible', 'Salt'];

    // set projects
    
    // works!
    $scope.projects = serviceProjects;
    
    // using this method makes my delete function not work
    //$scope.projects = syncData('users/' + $scope.auth.user.uid + '/projects');
    
    // using the this way causes a weird "does not load stuff" on next page loads
    //serviceProjects.$bind($scope, "projects");
    
    // rename input button
    $scope.renameInput = "Click project name at top of project page to rename.";
    
    // get project name for rename button
    $scope.getProjectName = function(key) {
        return "some name";
    }
    
    // to set navbar to active
    $scope.isActive = function (viewLocation) {
      var active = (viewLocation === $location.path());
      return active;
    };

    // add new project
    $scope.addProject = function() {
	  if ( $scope.newProjectName && $scope.newProjectType) {
	    $scope.projects.$add({user_id: $scope.auth.user.uid, name: $scope.newProjectName, type: $scope.newProjectType, description: $scope.newProjectDescription});
	    $scope.newProjectName = null;
	    $scope.newProjectType = null;
	    $scope.newProjectDescription = null;
	  }
    }

    // copy project
    $scope.cloneProject = function(key) {
      var projectRef = new Firebase('https://deploynebula.firebaseio.com/users/' + $scope.auth.user.uid + '/projects/' + key);
      projectRef.once('value', function(dataSnapshot) {
        // store dataSnapshot for use in below examples.
        var projectSnapshot = dataSnapshot;
        $scope.projects.$add(projectSnapshot.val());
      });
    }

    // remove project
    // argument 'item' is the key of the db
    $scope.removeProject = function(item) {
      var deleteUser = confirm('Are you absolutely sure you want to delete?');
      if (deleteUser) {
      //alert('Going to delete the user');
      $scope.projects.$remove(item);
      }  
    }
  }])
  
  
  //
  //  START Ansible CONTROLLERS
  //
  .controller('AnsibleProjectDetailsCtrl', ['$scope', '$http', '$routeParams', 'syncData', 'serviceProject', 'serviceRoles', 'serviceRole', 'serviceInventoryHost', function($scope, $http, $routeParams, syncData, serviceProject, serviceRoles, serviceRole, serviceInventoryHost) {
	  // set projectID from URL
      $scope.projectID = $routeParams.projectId;

      // set project
      serviceProject($scope.projectID).$bind($scope, "project");
      
      // set project name
      syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/name').$bind($scope, 'projectName');
      
      // get ansible inventory options
      //syncData('hostoptions/ansible').$bind($scope, 'inventoryOptions');
      $scope.inventoryOptions = syncData('hostoptions/ansible');
      
      // inventory list to be set by user
      //syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/inventory').$bind($scope, 'inventory');
      $scope.inventory = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/inventory');

	  // set roles
	  //serviceRoles($scope.projectID).$bind($scope, "roles");
	  $scope.roles = serviceRoles($scope.projectID);
	  
	  // external_data == tasks
	  $scope.external_data = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/external_data');

	  // input validation error message
	  $scope.inputErrorMsg = "";


      // vars for inventory
      //$scope.ansible_ssh_host = "";

	  // add new host to the list
	  $scope.addHost = function() {
	      
	      var sanitizedOptions = [];
	      var sanitizedString = "";
	      
	      // removing null options from the array, trying
	      for (var key in $scope.inventoryOptions) {
	          console.log( "for: " + $scope.inventoryOptions[key].name + " " + $scope.inventoryOptions[key].value );
	          if ( $scope.inventoryOptions[key].value !== undefined ) { // why doesn't this work!!!
	            console.log("KEEPING: " + $scope.inventoryOptions[key].name);
	            //$scope.options.splice(key,1);
	            sanitizedOptions.push($scope.inventoryOptions[key]);
	            sanitizedString = sanitizedString + " " + $scope.inventoryOptions[key].name + ": " + $scope.inventoryOptions[key].value;
	          }
	      }
	      
	      // PUSH TO FIREBASE
		  if( $scope.newHostName ) {
			  $scope.inventory.$add({ user_id: $scope.auth.user.uid,
			                          name: $scope.newHostName,
			                          group: $scope.ansible_group,
			                          ansible_ssh_host: $scope.ansible_ssh_host,
			                          ansible_ssh_port: $scope.ansible_ssh_port,
			                          ansible_ssh_user: $scope.ansible_ssh_user,
			                          ansible_ssh_pass: $scope.ansible_ssh_pass,
			                          ansible_sudo_pass: $scope.ansible_sudo_pass,
			                          ansible_connection: $scope.ansible_connection,
			                          ansible_ssh_private_key_file: $scope.ansible_ssh_private_key_file,
			                          ansible_python_interpreter: $scope.ansible_python_interpreter,
			                          ansible_interpreter: $scope.ansible_interpreter
			                        });
			  $scope.newHostName = null
			  $scope.ansible_ssh_host = null;
			  $scope.ansible_ssh_port = null;
			  $scope.ansible_ssh_user = null;
			  $scope.ansible_ssh_pass = null;
			  $scope.ansible_sudo_pass = null;
			  $scope.ansible_connection = null;
			  $scope.ansible_ssh_private_key_file = null;
			  $scope.ansible_python_interpreter = null;
			  $scope.ansible_interpreter = null;
		  }
		  else {
		      $scope.inputErrorMsg = "Error.";
		  }
		  return;
	  }
	  
	  
      // BUTTON: clear tasks
      $scope.clearTasks = function() {
          $scope.external_data.$remove();
      }
	  
	  // add new role to the list
	  $scope.addRole = function() {
		  if( $scope.newRoleName ) {
			  $scope.roles.$add({user_id: $scope.auth.user.uid, name: $scope.newRoleName, description: $scope.newRoleDescription});
			  $scope.newRoleName = null;
			  $scope.newRoleDescription = null;
		  }
		  else {
		      $scope.inputErrorMsg = "Error.";
		  }
		  return;
	  }
	  
	  // BUTTON: clear playbook returns
	  $scope.clear_playbook_returns = function(key) {
	      var role = serviceRole($scope.projectID, key);
	      role.$remove('returns');
	  }
	  
	  
	  // remove role
	  $scope.removeHost = function(key) {
	    var deleteUser = confirm('Are you absolutely sure you want to delete?');
        if (deleteUser) {
        //alert('Going to delete the user');
        $scope.inventory.$remove(key);
        }
	  }
	  
	  // button: run ansible playbook
	  $scope.ansible_playbook = function(playbook_key) {
	      
	      // send ansible playbook request to API
	      var stripped_uid = $scope.auth.user.uid.split(':');
          $scope.myURL = 'http://destiny.cloudmanifest.com:8000/ansible_playbook/' + stripped_uid[1] + '/' + $scope.projectID + '/' + playbook_key;
      
          $http({method: 'GET', url: $scope.myURL}).
            success(function(data, status) {
              $scope.status = status;
              $scope.data = data;
            }).
            error(function(data, status) {
              $scope.data = data || "Request failed";
              $scope.status = status;
          });
	      
	      
	  }
	  
	  // button: ping host and command... has been expanded
	  $scope.ansibleJenericInventory_run = function(project_key, pattern, module, args) {
	      $scope.code = null;
          $scope.response = null;
          $scope.job_id = null;
          
          var inventory = new Firebase('https://deploynebula.firebaseio.com/users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/inventory');
          var hostName = null;
          var hostUser = null;
          var hostPass = null;
          
          // start new
          //$scope.ansibleModules = new Firebase('https://deploynebula.firebaseio.com/moduleslist/ansible');
          //$scope.ansibleModules = serviceAnsibleModuleslist;
          
          var hostList = []

          inventory.once('value', function(dataSnapshot) {
            $scope.moduleSnapshot = dataSnapshot;

            $scope.moduleSnapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.name();
              var childHost = childSnapshot.child('name').val();
              console.log("childHost: " + childHost);
              hostUser = childSnapshot.child('ansible_ssh_user').val();
              hostPass = childSnapshot.child('ansible_ssh_pass').val();
              hostList.push(childHost);
              //hostList = hostList + childHost + ', ';
            })
          });
        
          console.log("hostList: " + hostList);
          
          $scope.external_data.$add({ user_id: $scope.auth.user.uid,
                                      project_id: $scope.projectID,
                                      status: "QUEUED",
                                      module_name: module,
                                      module_args: args,
                                      pattern: pattern,
                                      remote_user: hostUser,
                                      remote_pass: hostPass,
                                      host_list: hostList }).then(function(ref) {
              // the key of the new job = job_id
              var stripped_uid = $scope.auth.user.uid.split(':');
              $scope.myURL = 'http://destiny.cloudmanifest.com:8000/ansible_jeneric/' + stripped_uid[1] + '/' + $scope.projectID + '/' + ref.name();
          
              $http({method: 'GET', url: $scope.myURL}).
                success(function(data, status) {
                  $scope.status = status;
                  $scope.data = data;
                }).
                error(function(data, status) {
                  $scope.data = data || "Request failed";
                  $scope.status = status;
              });
          });
          $scope.commandToRun = null;
	  }
	  
	  // button: ping host and command... has been expanded
	  $scope.ansibleJeneric = function(host_key, module, args) {
	      $scope.code = null;
          $scope.response = null;
          $scope.job_id = null;
          
          var hostToUse = new Firebase('https://deploynebula.firebaseio.com/users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/inventory/' + host_key);
          var hostName = null;
          var hostUser = null;
          var hostPass = null;
          
          //new
          var dictHosts = []
          
          hostToUse.once('value', function(dataSnapshot) {
            var mySnapshot = dataSnapshot;
            name = mySnapshot.child('name').val();
            hostName = mySnapshot.child('ansible_ssh_host').val();
            hostUser = mySnapshot.child('ansible_ssh_user').val();
            hostPass = mySnapshot.child('ansible_ssh_pass').val();
            dictHosts.push(name);

          });
          
          $scope.external_data.$add({ user_id: $scope.auth.user.uid,
                                      project_id: $scope.projectID,
                                      status: "QUEUED",
                                      module_name: module,
                                      module_args: args,
                                      pattern: "*",
                                      remote_user: hostUser,
                                      remote_pass: hostPass,
                                      //host_list: hostName
                                      host_list: dictHosts }).then(function(ref) {
              // the key of the new job = job_id
              var stripped_uid = $scope.auth.user.uid.split(':');
              $scope.myURL = 'http://destiny.cloudmanifest.com:8000/ansible_jeneric/' + stripped_uid[1] + '/' + $scope.projectID + '/' + ref.name();
          
              $http({method: 'GET', url: $scope.myURL}).
                success(function(data, status) {
                  $scope.status = status;
                  $scope.data = data;
                }).
                error(function(data, status) {
                  $scope.data = data || "Request failed";
                  $scope.status = status;
              });
          });
          $scope.commandToRun = null;
	  }
	  
	  // copy project
      $scope.cloneRole = function(projectID, roleID) {
        var projectRef = new Firebase('https://deploynebula.firebaseio.com/users/' + $scope.auth.user.uid + '/projects/' + projectID + '/roles/' + roleID);
        projectRef.once('value', function(dataSnapshot) {
        // store dataSnapshot for use in below examples.
        var projectSnapshot = dataSnapshot;
        $scope.roles.$add(projectSnapshot.val());
        });
      }

      // remove role
	  $scope.removeRole = function(key) {
	    var deleteUser = confirm('Are you absolutely sure you want to delete?');
        if (deleteUser) {
        //alert('Going to delete the user');
        $scope.roles.$remove(key);
        }
	  }
	}])
	
	
	
	//
	//
	//
	//  ansible role details controller
	//
	//
	//
  .controller('AnsibleRoleDetailsCtrl', ['$scope', '$http', '$routeParams', 'syncData', 'serviceAnsibleModuleslist', 'serviceRole', 'serviceRoleModules', 'serviceRoleVariables', 'serviceRoleHandlers', 'serviceRoleIncludes', 
    function($scope, $http, $routeParams, syncData, serviceAnsibleModuleslist, serviceRole, serviceRoleModules, serviceRoleVariables, serviceRoleHandlers, serviceRoleIncludes) {
      
	  // vars from the URL
      $scope.roleID = $routeParams.roleId;
      $scope.projectID = $routeParams.projectId;
      
      // choices used for module options (may not be needed later)
      $scope.choices = [];
      $scope.paramaters = {};
      
      // input validation error message
      $scope.inputErrorMsg = "";
      
      // jquery ui sortable options
      $scope.whatisEvent = "";
      $scope.whatisUI = "";
      $scope.sortableOptions = {
          placeholder: "ui-state-highlight",
          cursor: "move",
          update: function( event, ui ) {
              var postData = $('#sortMe').sortable('serialize');
              console.log( postData );
          }
      }
      
      // angular $watch stuff
      // BUGGY
      //$scope.$watch('newModuleAction', function(newVal, oldVal) {
            //$scope.setOptions();
            //$scope.newModuleAction = newVal;
        //    console.log("$watch newModuleAction: TRIGGERED");
        //    
        //    if (newVal !== undefined  || oldVal !== undefined) {
        //        console.log("watch going to setOptions function")
        //        $scope.setOptions();
        //        console.log("back to watch from setOptions function")
        //        console.log("newModuleAction: " + $scope.newModuleAction)
        //        console.log("WATCH 1: " + newVal + " " + oldVal);
        //    }
      //}, true);
      
      // get input box validation state
      $scope.getValidationState = function(required, input_value) {
          if ( required == 'yes' && input_value == "" ) {
              console.log("getValidationState: 1, required: " + required + " intput_value: " + input_value + " and $scope.newModuleLoopItem: " + $scope.newModuleLoopItem + " <<<<");
              return "has-error";
          }
          else if ( required == 'yes' && input_value != undefined) {
              console.log("getValidationState: 2, required: " + required + " intput_value: " + input_value + " and $rootScope.newModuleLoopItem: " + $scope.newModuleLoopItem + " <<<<");
              return "has-success";
          }
          else if ( required == 'yes' && input_value == undefined) {
              console.log("getValidationState: 3, required: " + required + " intput_value: " + input_value + " and $scope.newModuleLoopItem: " + $scope.newModuleLoopItem + " <<<<");
              return "has-error";
          }
          else {
              console.log("getValidationState: 4else, required: " + required + " intput_value: " + input_value + " and $rootScope.newModuleLoopItem: " + $scope.newModuleLoopItem + " <<<<");
              return "";
          }
      }
      
      // checks if option paramater is being looped
      // not used, pending deletion
      $scope.isLopped = function(name) {
          if (name == $scope.newModuleLoopItem) {
              return "{{ item }}";
          }
          else {
              return null;
          }
      }

      // for on demand command info
      $scope.selectedDescription = "No Ansible task module selected.";
      //$scope.selectedOptions = {}; // not used currently i think

      // ------------------  datasnapshot testing START  ------------------
      //$scope.saltModuleNames = [];
      //$scope.keyList = {} ;

      //$scope.ansibleModules = new Firebase('https://deploynebula.firebaseio.com/moduleslist/ansible');
      //$scope.ansibleModules = serviceAnsibleModuleslist;

      //$scope.ansibleModules.once('value', function(dataSnapshot) {
        //$scope.moduleSnapshot = dataSnapshot;

        //$scope.moduleSnapshot.forEach(function(childSnapshot) {
          //var key = childSnapshot.name();
          //var childData = childSnapshot.child('name').val();
          //var childDesc = childSnapshot.child('description').val();
          //$scope.saltModuleNames.push(childData);
        //})
      //});
      // ------------------  datasnapshot testing END    ------------------


      $scope.ansibleModules = serviceAnsibleModuleslist;
      
      serviceRole($scope.projectID, $scope.roleID).$bind($scope, "role");
      
      //serviceRoleModules($scope.projectID, $scope.roleID).$bind($scope, "modules");
      $scope.modules = serviceRoleModules($scope.projectID, $scope.roleID);
      
      $scope.variables = serviceRoleVariables($scope.projectID, $scope.roleID);
      $scope.handlers = serviceRoleHandlers($scope.projectID, $scope.roleID);
      $scope.includes = serviceRoleIncludes($scope.projectID, $scope.roleID);
      
	  // set roles and modules ???
	  //syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/modules').$bind($scope, 'modulesInput');
	  //$scope.modules = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/modules');

      // set variables for plays
      //$scope.variables = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/variables');

      // set handlers for plays
      //$scope.handlers = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/handlers');

      // set includes for plays
      //$scope.includes = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/includes');

      // clear module text fields
      $scope.clearModule = function() {
        $scope.newModuleAction = "";
        $scope.setOptions();
        $scope.inputErrorMsg = "";
        
        // look in to this and clearing all this a little bit more
        // this helped clear the loop display
        $scope.options = null;
      }
      
      // SET MODULE NAME: from basic buttons
      $scope.setModuleName = function(name) {
          console.log($scope.newModuleAction + " from setModuleName");
          $scope.newModuleAction = name;
          console.log($scope.newModuleAction + " from setModuleName");
          $scope.setOptions();
      }
      
      // SET OPTIONS: set module choice options based on chosen action/module
      $scope.setOptions = function() {
          //if ($scope.newModuleAction != "") {
            console.log($scope.newModuleAction + " from setOptions 1");
            $scope.options = $scope.getModuleOptions($scope.newModuleAction);
            console.log($scope.options + " from setOptions 2");
            $scope.selectedDescription = $scope.getModuleDescription($scope.newModuleAction);
            console.log($scope.selectedDescription + " from setOptions 3");
          //}
      }

      // GET module description
      $scope.getModuleDescription = function(module) {
        var desc = "not set yet";
        $scope.ansibleModules2 = new Firebase('https://deploynebula.firebaseio.com/moduleslist/ansible');
        $scope.ansibleModules2.on('value', function(dataSnapshot2) {
          $scope.moduleSnapshot2 = dataSnapshot2;
          desc = "inner";

          $scope.moduleSnapshot2.forEach(function(childSnapshot2) {
            var key2 = childSnapshot2.name();
            var childData2 = childSnapshot2.val().name;
            var childDesc2 = childSnapshot2.child('description').val();
            var childOptions2 = childSnapshot2.child('options').val();
            desc = "almost";
            if ( childData2 == module ) {
              console.log("5 in getModulesDescription");
              desc = childDesc2;
              console.log($scope.desc + " in getModulesDescription");
              return $scope.desc;
            }
            else {
              desc = "No module selected.";
            }
          })
        });
        return desc;
      }
      
      // GET module options
      $scope.getModuleOptions = function(module) {
        $scope.options = {};
        
        $scope.ansibleModules3 = new Firebase('https://deploynebula.firebaseio.com/moduleslist/ansible');

        $scope.ansibleModules3.on('value', function(dataSnapshot3) {
          $scope.moduleSnapshot3 = dataSnapshot3;
          $scope.options = "inner";

          $scope.moduleSnapshot3.forEach(function(childSnapshot3) {
            var key3 = childSnapshot3.name();
            var childData3 = childSnapshot3.val().name;
            var childOptions3 = childSnapshot3.child('options').val();
            $scope.desc = "almost";
            if ( childData3 == module ) {
              $scope.options = childOptions3;
              return $scope.options;
            }
            else {
              $scope.options = {};
            }
          })
        });
        return $scope.options;
      }

      //
	  // add new role to the list
	  //
	  $scope.addModule = function() {
	    var tmpOptions = [];
	    var ifProceed = true;
	    
	    // removing null options from the array, trying
	    for (var key in $scope.options) {       
	      //console.log( "for: " + $scope.options[key].paramater + " " + $scope.options[key].value );
	      if ( $scope.options[key].value !== undefined ) { // why doesn't this work!!!
	        //console.log("slicing: " + $scope.options[key].value);
	        //$scope.options.splice(key,1);
	        tmpOptions.push($scope.options[key]);
	      }
	      if ( $scope.options[key].required == 'yes' && ($scope.options[key].value == undefined || $scope.options[key].value == '') ) {
	          ifProceed = false;
	          $scope.inputErrorMsg = "Missing option " + $scope.options[key].paramater;
	      }
	    }
	    
		if( $scope.newModuleName && $scope.newModuleAction && ifProceed ) {
		  var order = Object.keys($scope.modules).length - 10;
		  console.log( "order: " + order);
		  if ( $scope.newModuleNotify ) {
              $scope.modules.$add({ user_id: $scope.auth.user.uid,
                                    name: $scope.newModuleName,
                                    option: $scope.newModuleAction,
                                    options: tmpOptions,
                                    order: order,
                                    notify: $scope.newModuleNotify });
              $scope.newModuleName = null;
              $scope.newModuleAction = null;
              $scope.choices = [];
              $scope.options = null;
              $scope.selectedDescription = "No module selected.";
              $scope.inputErrorMsg = "";
              $scope.newModuleNotify = null;
		  }
		  else {
		      $scope.modules.$add({ user_id: $scope.auth.user.uid,
                                    name: $scope.newModuleName,
                                    option: $scope.newModuleAction,
                                    options: tmpOptions,
                                    order: order });
              $scope.newModuleName = null;
              $scope.newModuleAction = null;
              $scope.choices = [];
              $scope.options = null;
              $scope.selectedDescription = "No module selected.";
              $scope.inputErrorMsg = "";
		  }
          
		}
		else {
		    $scope.inputErrorMsg += "Missing Values.";
		    console.log($scope.newModuleName + " and " + $scope.newModuleAction + " and " + ifProceed );
		}
	  }
	  
	  // generate string of required options
	  
	 
      // remove text field
      $scope.removeChoice = function() {
          $scope.choices.pop();
      }
      // add text field
      $scope.addNewChoice = function() {
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({});
        };
      // the other thing
      $scope.showAddChoice = function(choice) {
          return choice.id === $scope.choices[$scope.choices.length-1].id;
        };
      // show choice lable
      $scope.showChoiceLabel = function (choice) {
        return choice.id === $scope.choices[0].id;
      }
      
      // remove task button
	  $scope.removeTask = function(key) {
	    var deleteTask = confirm('Are you absolutely sure you want to delete?');
        if (deleteTask) {
        //alert('Going to delete the user');
        $scope.modules.$remove(key);
        }
	  }
	  
	  // add variable to playbook
	  $scope.addVariable = function() {
	      if( $scope.newVarName && $scope.newVarValue ) {
              $scope.variables.$add({ user_id: $scope.auth.user.uid,
                                    name: $scope.newVarName,
                                    value: $scope.newVarValue });
              $scope.newVarName = null;
              $scope.newVarValue = null;
    		}
    		else {
    		    //$scope.inputErrorMsg += "Missing Values.";
    		    console.log( "ERROR: " + $scope.newVarName + " and " + $scope.newVarValue );
    		}
	  }
	  
	  // remove variable from playbook
	  $scope.removeVariable = function(key) {
	      var deleteVariable = confirm('Are you sure?');
	      if (deleteVariable) {
	          $scope.variables.$remove(key);
	      }
	  }
	  
	  // add handler to playbook
	  $scope.addHandler = function() {
	      if( $scope.newHandlerName && $scope.newHandlerServiceName && $scope.newHandlerServiceState ) {
              $scope.handlers.$add({ user_id: $scope.auth.user.uid,
                                    name: $scope.newHandlerName,
                                    service_name: $scope.newHandlerServiceName,
                                    service_state: $scope.newHandlerServiceState });
              $scope.newHandlerName = null;
              $scope.newHandlerServiceName = null;
              $scope.newHandlerServiceState = null;
    		}
    		else {
    		    //$scope.inputErrorMsg += "Missing Values.";
    		    console.log( "ERROR: " + $scope.newHandlerName + " and " + $scope.newHandlerServiceName + " and " + $scope.newHandlerServiceState );
    		}
	  }
	  
	  // remove variable from playbook
	  $scope.removeHandler = function(key) {
	      var deleteHandler = confirm('Are you sure?');
	      if (deleteHandler) {
	          $scope.handlers.$remove(key);
	      }
	  }
	  
	  // add include to playbook
	  $scope.addInclude = function() {
	      if ( $scope.newIncludeName ) {
	          $scope.includes.$add({ user_id: $scope.auth.user.uid,
	                                 name: $scope.newIncludeName });
	          $scope.newIncludeName = null;
	      }
	  }
	  
	  // remove include item
	  $scope.removeInclude = function(key) {
	      var deleteInclude = confirm('Are you sure?');
	      if (deleteInclude) {
	          $scope.includes.$remove(key);
	      }
	  }
	  
	  // for 'ng-if' stuffs, checks if string is defined and returns true/false
	  $scope.hasData = function(val) {
	      if (Object.keys(val).length <= 11) {
	          console.log("FALSE " + Object.keys(val).length);
	          return false;
	      }
	      else {
	          console.log("TRUE " + Object.keys(val).length);
	          return true;
	      }
	  }
	  $scope.hasVariables = function(val) {
	      if (val == undefined || val == null) {
	          //console.log( "NO VARIABLES: " + val );
	          return false;
	      }
	      else {
	          //console.log( "YES VARIABLES: " + val );
	          return true;
	      }
	  }
	  $scope.hasIncludes = function(val) {
	      if (val == undefined || val == null) {
	          //console.log( "NO VARIABLES: " + val );
	          return false;
	      }
	      else {
	          //console.log( "YES VARIABLES: " + val );
	          return true;
	      }
	  }
	  $scope.hasTasks = function(val) {
	      if (val == undefined || val == null) {
	          //console.log( "NO TASKS: " + val );
	          return false;
	      }
	      else {
	          //console.log( "YES TASKS: " + val );
	          return true;
	      }
	  }
	  $scope.hasHandlers = function(val) {
	      if (val == undefined || val == null) {
	          //console.log( "NO HANDLER: " + val );
	          return false;
	      }
	      else {
	          //console.log( "YES HANDLER: " + val );
	          return true;
	      }
	  }
	  $scope.hasNotify = function(val) {
	      if (val == undefined) {
	          console.log( "NO NOTIFY: " + val );
	          return false;
	      }
	      else {
	          console.log( "YES NOTIFY: " + val );
	          return true;
	      }
	  }
	  
	}])
	
	//
	//  START SALT CONTROLLERS
	//
	.controller('SaltProjectDetailsCtrl', ['$scope', '$http', '$routeParams', 'syncData', function($scope, $http, $routeParams, syncData) {
	  // set projectID from URL
      $scope.projectID = $routeParams.projectId;
      //$scope.projectType = $routeParams.projectType;

      // set project
      $scope.project = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID);
      
      // set project name
      syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/name').$bind($scope, 'projectName')

	  // set roles
	  $scope.roles = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles');
	  
	  // input validation error message
	  $scope.inputErrorMsg = "";

	  // add new role to the list
	  $scope.addRole = function() {
		  if( $scope.newRoleName ) {
			  $scope.roles.$add({user_id: $scope.auth.user.uid, name: $scope.newRoleName, description: $scope.newRoleDescription});
			  $scope.newRoleName = null;
			  $scope.newRoleDescription = null;
		  }
		  else {
		      $scope.inputErrorMsg = "Error.";
		  }
		  return;
	  }
	  
	  // copy project
      $scope.cloneRole = function(projectID, roleID) {
        var projectRef = new Firebase('https://deploynebula.firebaseio.com/users/' + $scope.auth.user.uid + '/projects/' + projectID + '/roles/' + roleID);
        projectRef.once('value', function(dataSnapshot) {
        // store dataSnapshot for use in below examples.
        var projectSnapshot = dataSnapshot;
        $scope.roles.$add(projectSnapshot.val());
        });
      }

      // remove role
	  $scope.removeRole = function(key) {
	    var deleteUser = confirm('Are you absolutely sure you want to delete?');
        if (deleteUser) {
        //alert('Going to delete the user');
        $scope.roles.$remove(key);
        }
	  }
	}])

  .controller('SaltRoleDetailsCtrl', ['$scope', '$http', '$routeParams', 'syncData', function($scope, $http, $routeParams, syncData) {
      
	  // vars from the URL
      $scope.roleID = $routeParams.roleId;
      $scope.projectID = $routeParams.projectId;
      
      // choices uses for module options (may not be needed later)
      $scope.choices = [];
      $scope.paramaters = {};
      
      // input validation error message
      $scope.inputErrorMsg = "";
      
      // jquery ui sortable options
      $scope.whatisEvent = "";
      $scope.whatisUI = "";
      $scope.sortableOptions = {
          placeholder: "ui-state-highlight",
          cursor: "move",
          update: function( event, ui ) {
              var postData = $('#sortMe').sortable('serialize');
              console.log( postData );
          }
      }
      
      // angular $watch stuff
      // BUGGY
      $scope.$watch('newModuleAction', function(newVal, oldVal) {
          if (true) {
            $scope.setOptions();
            console.log("newModuleAction: " + $scope.newModuleAction)
            console.log("WATCH 1: " + newVal + " " + oldVal);
          }
      }, true);
      

      // get input box validation state
      $scope.getValidationState = function(required, input_value) {
          if ( required == 'yes' && input_value == "" ) {
              return "has-error";
          }
          else if ( required == 'yes' && input_value == undefined ) {
              return "has-error";
          }
          else if ( required == 'yes' && input_value != undefined ) {
              return "has-success";
          }
          else {
              return "";
          }
      }

      // for on demand command info
      $scope.selectedDescription = "No module selected.";
      $scope.selectedOptions = {}; // not used currently i think

      // ------------------  datasnapshot testing START  ------------------
      $scope.saltModuleNames = [];
      $scope.keyList = {} ;

      $scope.ansibleModules = new Firebase('https://deploynebula.firebaseio.com/moduleslist/salt');

      $scope.ansibleModules.once('value', function(dataSnapshot) {
        $scope.moduleSnapshot = dataSnapshot;

        $scope.moduleSnapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.name();
          var childData = childSnapshot.child('name').val();
          var childDesc = childSnapshot.child('description').val();
          $scope.saltModuleNames.push(childData);
        })
      });
      // ------------------  datasnapshot testing END    ------------------

      //
      //
      // THIS STUFF SHOULD USE
      // syncData('syncedValue').$bind($scope, 'syncedValue');
      //
      //
      $scope.modules = {};
      // set role
      $scope.role = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID);
      
      // syncData('syncedValue').$bind($scope, 'syncedValue');
      // set role name
      syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/name').$bind($scope, 'roleName');
      
      // set role hosts
      syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/playHosts').$bind($scope, 'playHosts');

      // set role username
      // $scope.items.$bind($scope, "remoteItems");
      syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/playUsername').$bind($scope, 'playUsername');

	  // set roles
	  syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/modules').$bind($scope, 'modulesInput');
	  $scope.modules = syncData('users/' + $scope.auth.user.uid + '/projects/' + $scope.projectID + '/roles/' + $scope.roleID + '/modules');

      // clear module text fields
      $scope.clearModule = function() {
        $scope.newModuleAction = "";
        $scope.setOptions();
        $scope.inputErrorMsg = "";
      }
      
      // SET MODULE NAME: from basic buttons
      $scope.setModuleName = function(name) {
          console.log($scope.newModuleAction + " from setModuleName");
          $scope.newModuleAction = name;
          console.log($scope.newModuleAction + " from setModuleName");
          $scope.setOptions();
      }
      
      // SET OPTIONS: set module choice options based on chosen action/module
      $scope.setOptions = function() {
        console.log($scope.newModuleAction + " from setOptions 1");
        $scope.options = $scope.getModuleOptions($scope.newModuleAction);
        console.log($scope.options + " from setOptions 2");
        $scope.selectedDescription = $scope.getModuleDescription($scope.newModuleAction);
        console.log($scope.selectedDescription + " from setOptions 3");
      }

      // GET module description
      $scope.getModuleDescription = function(module) {
        var desc = "not set yet";
        $scope.ansibleModules2 = new Firebase('https://deploynebula.firebaseio.com/moduleslist/salt');
        $scope.ansibleModules2.on('value', function(dataSnapshot2) {
          $scope.moduleSnapshot2 = dataSnapshot2;
          desc = "inner";

          $scope.moduleSnapshot2.forEach(function(childSnapshot2) {
            var key2 = childSnapshot2.name();
            var childData2 = childSnapshot2.val().name;
            var childDesc2 = childSnapshot2.child('description').val();
            var childOptions2 = childSnapshot2.child('options').val();
            desc = "almost";
            if ( childData2 == module ) {
              console.log("5");
              desc = childDesc2;
              console.log($scope.desc);
              return $scope.desc;
            }
            else {
              desc = "No module selected.";
            }
          })
        });
        return desc;
      }
      
      // GET module options
      $scope.getModuleOptions = function(module) {
        $scope.options = {};
        
        $scope.ansibleModules3 = new Firebase('https://deploynebula.firebaseio.com/moduleslist/salt');

        $scope.ansibleModules3.on('value', function(dataSnapshot3) {
          $scope.moduleSnapshot3 = dataSnapshot3;
          $scope.options = "inner";

          $scope.moduleSnapshot3.forEach(function(childSnapshot3) {
            var key3 = childSnapshot3.name();
            var childData3 = childSnapshot3.val().name;
            var childOptions3 = childSnapshot3.child('options').val();
            $scope.desc = "almost";
            if ( childData3 == module ) {
              $scope.options = childOptions3;
              return $scope.options;
            }
            else {
              $scope.options = {};
            }
          })
        });
        return $scope.options;
      }

      //
	  // add new role to the list
	  //
	  $scope.addModule = function() {
	    var tmpOptions = [];
	    var ifProceed = true;
	    
	    // removing null options from the array, trying
	    for (var key in $scope.options) {       
	      //console.log( "for: " + $scope.options[key].paramater + " " + $scope.options[key].value );
	      if ( $scope.options[key].value !== undefined ) { // why doesn't this work!!!
	        //console.log("slicing: " + $scope.options[key].value);
	        //$scope.options.splice(key,1);
	        tmpOptions.push($scope.options[key]);
	      }
	      if ( $scope.options[key].required == 'yes' && ($scope.options[key].value == undefined || $scope.options[key].value == '') ) {
	          ifProceed = false;
	          $scope.inputErrorMsg = "Missing option " + $scope.options[key].paramater;
	      }
	    }
	    
		if( $scope.newModuleName && $scope.newModuleAction && ifProceed ) {
          $scope.modules.$add({ user_id: $scope.auth.user.uid,
                                name: $scope.newModuleName,
                                option: $scope.newModuleAction,
                                options: tmpOptions });
          $scope.newModuleName = null;
          $scope.newModuleAction = null;
          $scope.choices = [];
          $scope.options = {};
          $scope.selectedDescription = "No module selected.";
          $scope.inputErrorMsg = "";
		}
		else {
		    $scope.inputErrorMsg += "Missing Values.";
		    console.log($scope.newModuleName + " and " + $scope.newModuleAction + " and " + ifProceed );
		}
	  }
	  
	  // generate string of required options
	  
	 
      // remove text field
      $scope.removeChoice = function() {
          $scope.choices.pop();
      }
      // add text field
      $scope.addNewChoice = function() {
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({});
        };
      // the other thing
      $scope.showAddChoice = function(choice) {
          return choice.id === $scope.choices[$scope.choices.length-1].id;
        };
      // show choice lable
      $scope.showChoiceLabel = function (choice) {
        return choice.id === $scope.choices[0].id;
      }
      
      // remove task button
	  $scope.removeTask = function(key) {
	    var deleteTask = confirm('Are you absolutely sure you want to delete?');
        if (deleteTask) {
        //alert('Going to delete the user');
        $scope.modules.$remove(key);
        }
	  }
	  
	}])
	

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
	  $scope.newMessage = null;

	  // constrain number of messages by limit into syncData
	  // add the array into $scope.messages
	  $scope.messages = syncData('messages', 20);

	  // add new messages to the list
	  $scope.addMessage = function() {
		 if( $scope.newMessage ) {
			$scope.messages.$add({ user_id: $scope.auth.user.uid, user_name: $scope.auth.user.name, user_email: $scope.auth.user.email, text: $scope.newMessage});
			$scope.newMessage = null;
		 }
	  };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
	  $scope.email = null;
	  $scope.pass = null;
	  $scope.confirm = null;
	  $scope.createMode = false;
	  
	  // angular $watch stuff
      // BUGGY
      $scope.$watch('pass', function(newVal, oldVal) {
            console.log("pass: " + $scope.pass)
            console.log("WATCH 1: " + newVal + " " + oldVal);
      }, true);
      
      // angular $watch stuff
      // BUGGY
      $scope.$watch('email', function(newVal, oldVal) {
            console.log("email: " + $scope.email)
            console.log("WATCH 2: " + newVal + " " + oldVal);
      }, true);

	  $scope.login = function(cb) {
		 $scope.err = null;
		 if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		 }
		 else if( !$scope.pass ) {
			$scope.err = 'Please enter a password';
		 }
		 else {
			loginService.login($scope.email, $scope.pass, function(err, user) {
			   $scope.err = err? err + '' : null;
			   if( !err ) {
				  cb && cb(user);
			   }
			});
		 }
	  };

	  $scope.createAccount = function() {
		 $scope.err = null;
		 if( assertValidLoginAttempt() ) {
			loginService.createAccount($scope.email, $scope.pass, function(err, user) {
			   if( err ) {
				  $scope.err = err? err + '' : null;
			   }
			   else {
				  // must be logged in before I can write to my profile
				  $scope.login(function() {
					 loginService.createProfile(user.uid, user.email);
					 $location.path('/account');
				  });
			   }
			});
		 }
	  };

	  function assertValidLoginAttempt() {
		 if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		 }
		 else if( !$scope.pass ) {
			$scope.err = 'Please enter a password';
		 }
		 else if( $scope.pass !== $scope.confirm ) {
			$scope.err = 'Passwords do not match';
		 }
		 return !$scope.err;
	  }
   }])

  .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

    $scope.logout = function() {
	  loginService.logout();
    };

    $scope.oldpass = null;
    $scope.newpass = null;
    $scope.confirm = null;

    $scope.reset = function() {
	  $scope.err = null;
	  $scope.msg = null;
    };

    $scope.updatePassword = function() {
	  $scope.reset();
	  loginService.changePassword(buildPwdParms());
    };

    function buildPwdParms() {
	  return {
	    email: $scope.auth.user.email,
	    oldpass: $scope.oldpass,
	    newpass: $scope.newpass,
	    confirm: $scope.confirm,
	    callback: function(err) {
	      if( err ) {
		  $scope.err = err;
	      }
	      else {
		    $scope.oldpass = null;
		    $scope.newpass = null;
		    $scope.confirm = null;
		    $scope.msg = 'Password updated!';
	      }
	    }
      }
    }
  }])
  
  .controller('HeaderController', ['$scope', 'syncData', '$location', function($scope, syncData, $location) {
    console.log( "HEADER CONTROLLER >>>>>>");

    //syncData('users/' + $scope.auth.user.uid + '/isAdmin').$bind($scope, 'isUserAdmin');
    //syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
    
    $scope.isAdmin = function () { 
        return $scope.isUserAdmin;
    };
    
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  
  }]);
