var meteorApps = new Mongo.Collection("meteorApps");

if (Meteor.isClient) {
  Template.applicationList.helpers({
    apps: function () {
        return meteorApps.find({}); 
    },
    isStarted: function(status) {
      if(status === STATUS_STARTED){
        return true;
      } else {
        return false;
      }
    }
  });


  Template.addMeteorApp.events({
    'submit .add-form': function(event){
      event.preventDefault();

      var nameInput = $(event.target).find('input[name="name"]');
      var pathInput = $(event.target).find('input[name="app-path"]');
      var portInput = $(event.target).find('input[name="port"]');

      if (!nameInput.val() || !pathInput.val() || !portInput.val()){
        return;
      }

      meteorApps.insert({
        name: nameInput.val(),
        pid: "",
        path: pathInput.val(),
        port: portInput.val(),
        status: STATUS_STOPPED
      });

      Router.go('home', {successMessage: "Application added successfully !"});
    }
  });

  Template.applicationList.events({
    'click #remove-meteor-app': function() {
      meteorApps.remove({_id: this._id});
    },

    'click #start-meteor-app': function() {
      Meteor.call('startMeteorApp', this._id, this.path, this.port, function(err, data){
       if (err) throw err;


      });
    }, 

    'click #stop-meteor-app': function() {
       Meteor.call('stopMeteorApp', this._id, this.pid, function(err, data){
       if (err) throw err;


      });
    }

  });


}

if (Meteor.isServer) {
  var childProcess = Npm.require('child_process');
  var fs = Npm.require('fs');

  Meteor.methods({
    startMeteorApp: function (_id, path, port) {
        var child = childProcess.spawn("meteor", 
        ['--port', port]    
        ,
        {
          stdio: [
            0, // use parents stdin for child
            'pipe', // pipe child's stdout to parent
            fs.openSync("err.out", "w") // direct child's stderr to a file
          ], 
          cwd: path
        });

        // On exit 
        child.on('exit', function(code, signal){

        });

        // On  Error 
        child.on('Error', function(err){
          if(err) throw err;
        });

        if (child) {
          meteorApps.update({"_id":_id}, {$set:{"status": STATUS_STARTED, "pid": child.pid}});
        }
      },
      stopMeteorApp: function(_id, pid){
        kill(pid, 'SIGTERM', function(err, result){
          if (err) throw err;

          meteorApps.update({"_id":_id}, {$set:{"status": STATUS_STOPPED, "pid": ""}});
        });
          
      }
  }); 

  function kill(pid, signal, callback){
    var callback = callback || function(){};

    try {
      process.kill(pid, 'SIGTERM');
      callback(null, "success");
    } catch (err) {
      callback(err, null);
    }
  }
  
  Meteor.startup(function () {
    // code to run on server at startup

    
  });






  //apps.insert(myApp);




}


 

