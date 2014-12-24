Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', function(){
	this.render('applicationList');
},
{
	name: 'home'
});

Router.route('/meteorapp/add', function () {
  this.render('addMeteorApp');
}, {
	name: 'meteorapp.add'
});

Router.route('/meteorapp/start', function(){
	console.log(this.params._id  + " / "  + this.params.path);

	console.log("toto");
	startMeteorApp(this.params._id, this.params.path);
	Router.go("home");
},
{
	name:"meteorapp.start",
	where: "server"
});