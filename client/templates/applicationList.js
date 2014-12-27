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

    // Initializing the errors key fir this template
    var ERRORS_KEY = "applicationListErrors";

    // On template creation
    Template.applicationList.created = function(){
        // Initialize the errors object
        Session.set(ERRORS_KEY, {});
    }

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
        },

        /**
         *  Error Handling 
         */
         errorMessages: function() {
            return _.values(Session.get(ERRORS_KEY));
         }

    });


    /**********************************\
                   Events
    \**********************************/

    Template.applicationList.events({

        'click #remove-meteor-app': function() {
          meteorApps.remove({_id: this._id});
        },

        'click #start-meteor-app': function(template) {
            var errors = {};
       
            Meteor.call('startMeteorApp', this._id, this.path, this.port, function(err, data){
                if (err) {
                    errors.start = err.reason;
                    Session.set(ERRORS_KEY, errors);
                }
            });
           
        }, 

        'click #stop-meteor-app': function() {
            var errors = {};

            Meteor.call('stopMeteorApp', this._id, this.pid, function(err, data){
                if (err) {
                    errors.stop = err.reason;
                    Session.set(ERRORS_KEY, errors);
                }
            });

        }
    });


}