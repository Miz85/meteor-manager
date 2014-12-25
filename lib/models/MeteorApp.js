//Attempt at a model
MeteorApp = function(_id, name, path, port, pid, status){

	if(_id){
		this._id = _id;
	}

	if(!name) {
		this.name = "";
	} else {
		this.name = name;
	}

	if(!path) {
		this.path = "";
	} else {
		this.path = path;
	}
	
	if(!port) {
		this.port = "";
	} else {
		this.port = port;
	}

	if(!pid) {
		this.pid = "";
	} else {
		this.pid = pid;
	}
	
	if(!status) {
		this.status = STATUS_STOPPED;
	} else {
		this.status = status;
	}
	
};

MeteorApp.prototype.save = function(){

	// Application already exists
	// we're in edit mode
	if(this._id) {
		meteorApps.update(
			{"_id": this._id},
			{$set: 
				{
					"name": this.name,
					"path": this.path,
					"port": this.port
				}
			}
		);
	} else {
		meteorApps.insert({
            "name": this.name,
            "pid": this.pid,
            "path": this.path,
            "port": this.port,
            "status": this.status
        });
	}

}
