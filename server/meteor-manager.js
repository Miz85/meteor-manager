if (Meteor.isServer) {
  var childProcess = Npm.require('child_process');
  var fs = Npm.require('fs');
  var nodePath = Npm.require('path');

  Meteor.methods({
    startMeteorApp: function (_id, path, port) {
        // Check if the path is a valid meteor app path
        if(!fs.existsSync(nodePath.join(path, '.meteor'))){
          console.log("not a meteor app folder");
          return;
        }

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
  





}


 

