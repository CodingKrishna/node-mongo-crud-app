var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
	
router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}));

router.get('/', function(req, res, next) { //GET all users
	mongoose.model('User').find({}, function (err, users) {
		if (err) {
			return console.error(err);
		} else {
			res.send(users);
		}     
	});
});

router.get('/:id', function(req, res, next) { //GET user by id
	mongoose.model('User').findById(req.params.id, function (err, user) {
		if (err) {
			res.send(err);
		} else {
			res.send(user)
		}
	});
});

router.post('/', function(req, res) { //Create new User
	var name = req.body.name;
	var mobile = req.body.mobile;
	var dob = req.body.dob;
	var gender = req.body.gender;
	//call the create function for our database
	mongoose.model('User').create({
		name : name,
		mobile : mobile,
		gender : gender,
		dob : dob
	}, function (err, user) {
		if (err) {
			res.send(err);
		} else {
			res.send(user);
		}
	});
});

router.put('/:id', function(req, res) { // Update Exisiting user
	var id = req.params.id;
	
	var name = req.body.name;
	var mobile = req.body.mobile;
	var dob = req.body.dob;
	var gender = req.body.gender;
	mongoose.model('User').update({ _id: id }, { $set: {
		name: name,
		mobile: mobile,
		dob: dob,
		gender: gender
	}}, function (err, resp) {
		if (err) {
			res.send(err);
		} else {
			res.send(resp);
		}
	});
});

router.delete('/:id', function(req, res, next) { //DELETE User by ID
	mongoose.model('User').remove({ _id: req.params.id }, function (err, resp) {
		if (err) {
			res.send(err);
		} else {
			res.send(resp);
		}
	});
});

module.exports = router;
