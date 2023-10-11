const Farmer = require("./model");
exports.FarmerSignup = async (req, res) => {

	await Farmer.create(req.body);

	res.status(201).json({
		status: "success",
		body: req.body
	});



}

//controller for login

exports.FarmerLogin = async (req, res) => {

	const user = await Farmer.findOne({ email: req.body.email});
	if(user != null){
		const verified = user.password == req.body.password ? true : false;
	
	if(verified){
		res.status(200).json({
			status: "success",
			body: req.body
		});
	}else{
		res.status(200).json({
			status: "failure",
			body: req.body
		});
	}

	}else{
		res.status(200).json({
			status: "userNotFound",
			body: req.body
		});

	}
	
	

}

