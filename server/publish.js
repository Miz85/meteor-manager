Meteor.publish('applicationList', function(){
	return meteorApps.find({});
});