/**
 *  Helpers & Event Handlers for 
 *  the applicationList Template
 * 
 *  @templateName: login
 *  @templateFile: templates/login.html
 *  @author: Miz85
 */

// If we're on the client side
if(Meteor.isClient){

    // Initializing the errors key for this template
    var ERRORS_KEY = "loginErrors";

    // On template creation, initialize the errors 
    // array
    Template.login.created = function() {
        Session.set(ERRORS_KEY, {});
        Session.set("signin", true);
    }

    Template.login.helpers({
        signin: function(){
            return Session.get("signin");
        }
    });

    /*****************************\
                Events
    \*****************************/

    Template.login.events({
        'submit #loginForm': function(event) {

            // Stop the form regular submission
            event.preventDefault();

            // Get the input values
            var email = $(event.target).find('input[name="email"]');
            var password = $(event.target).find('input[name="password"]');

            // Try to login the user with the given credentials
            Meteor.loginWithPassword(email.val(), password.val(), function(err){
                // If there was an error, we get it to the login page
                if(err) throw err;

                // If login was successful, we go to the home page
                Router.go('home');
            });
        },

        'click #signup-link': function() {
            Session.set("signin", false);
        },

        'click #login-link': function() {
            Session.set("signin", true);
        },

        'submit #signup-form': function(event) {
            event.preventDefault();

            var username = $(event.target).find('input[name="username"]');
            var email = $(event.target).find('input[name="email"]');
            var password = $(event.target).find('input[name="password"]');

            Accounts.createUser({
                "username": username.val(),
                "email": email.val(),
                "password": password.val() 
            }, function(err){
                if(err) throw err;

                // if created successfully, send verification email
                Router.go("home");
            });
        }
    });

}