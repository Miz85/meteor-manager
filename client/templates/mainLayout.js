/**
 *  Helpers & Event Handlers for 
 *  the applicationList Template
 * 
 *  @templateName: mainLayout
 *  @templateFile: templates/mainLayout.html
 *  @author: Miz85
 */

 // If we're on the client side
 if(Meteor.isClient) {

    Template.mainLayout.created = function(){
        if(!Session.get("selected")){
            Session.set("selected", 'home');
            Router.go("home");
        }
        
    }

    /***********************************\
                   Helpers
    \***********************************/
    Template.mainLayout.helpers({
        currentUserEmail: function(){
            return Meteor.user().emails[0].address;
        }, 
        selected: function(id) {
            return Session.get("selected") === id;
        }
    });


    /***********************************\
                   Events
    \***********************************/
    Template.mainLayout.events({
        'click a#logout': function(){
            Meteor.logout(function(err){
                if (err) throw err;

                Router.go('login');
            });
        }, 

        'click .menu li': function(event) {
            Session.set("selected", event.currentTarget.id);
            Router.go($(event.currentTarget).find("a")[0].href);
        }
    });

 }