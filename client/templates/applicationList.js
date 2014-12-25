/**
 *  Helpers & Event Handlers for 
 *  the applicationList Template
 * 
 *  @templateName: applicationList
 *  @templateFile: templates/applicationList.html
 *  @author: Miz85
 */

// If we're on the client 
if(Meteor.isClient){

	/**********************************\
	               Helpers
	\**********************************/

	Template.applicationList.helpers({
        /**
         *  Fetches the list of Meteor applications
         */ 
        apps: function () {
            return meteorApps.find({}); 
        },

        /**
         * Helper for Blaze 
         * Returns true if a the app status is "Started"
         * and false otherwise
         */
        isStarted: function(status) {
          if(status === STATUS_STARTED){
            return true;
          } else {
            return false;
          }
        }
    });


    /**********************************\
                   Events
    \**********************************/

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
        },

        'click #edit-meteor-app': function() {
            
        }
    });


}