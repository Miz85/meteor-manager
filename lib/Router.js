Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.onBeforeAction(function(){
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.user()) {
    // if the user is not logged in, Redirect to login page
    Router.go('/login');
    this.next();
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    //from running
    this.next();
  }
});

Router.route('/login', 
{
    name: 'login',
    layoutTemplate: 'loginLayout',
    action: function() {
        this.render('login');
    }
});


Router.route('/', 
{
    name: 'home',
    action: function() {
        this.render('applicationList');
    }
});

Router.route('/meteorapp/add', function () {
  this.render('addMeteorApp');
}, 
{
    name: 'meteorapp.add'
});

Router.route('/meteorapp/edit/:_id', 
{
    name: 'meteorapp.edit',
    data: function(){
        return meteorApps.findOne({_id: this.params._id});
    },
    action: function() {
        this.render('addMeteorApp');
    }
});