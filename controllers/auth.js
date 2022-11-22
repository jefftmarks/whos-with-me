const User = require('../models/user');

const register = async (req, res) => {
	res.status(200).json({msg: 'Register'});
};

const login = async (req, res) => {
	res.status(200).json({msg: 'Login'});
};

const profile = async (req, res) => {
	res.status(200).json({msg: 'Get Profile'});
};

module.exports = {
	register,
	login,
	profile,
};