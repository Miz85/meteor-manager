/**
 *  Helpers & Event Handlers for 
 *  the addMeteorApp Template
 * 
 *  @templateName: addMeteorApp
 *  @templateFile: templates/addMeteorApp.html
 *  @author: Miz85
 */

// If we're on the client 
if(Meteor.isClient){

	/**********************************\
	               Helpers
	\**********************************/

  Template.addMeteorApp.helpers({

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
     Template.addMeteorApp.events({
        'submit .add-form': function(event){
          event.preventDefault();

          var nameInput = $(event.target).find('input[name="name"]');
          var pathInput = $(event.target).find('input[name="app-path"]');
          var portInput = $(event.target).find('input[name="port"]');
          var idInput = $(event.target).find('input[name="_id"]');

          // TODO: front end checks for mandatory fields
          if (!nameInput.val() || !pathInput.val() || !portInput.val()){
            return;
          }

          var currentApp = new MeteorApp(idInput.val(), nameInput.val(), pathInput.val(), portInput.val());
          currentApp.save();

          Router.go('home', {successMessage: "Application added successfully !"});
        }
      });

}