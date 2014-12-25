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