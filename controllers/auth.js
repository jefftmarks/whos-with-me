const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequestError } = require('../errors');

const register = async (req, res) => {
	const user = await User.create(req.body);
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({user: user, token});
};

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new BadRequestError('Please provide username and password');
	}

	const user = await User.findOne({username})
	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials')
	}

	const passwordIsMatch = await user.comparePassword(password);
	if (!passwordIsMatch) {
		throw new UnauthenticatedError('Invalid Credentials')
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({user: user, token});

};

const profile = async (req, res) => {
	const user = await User.findById(req.user.userId);
	res.status(StatusCodes.OK).json(user);
};

module.exports = {
	register,
	login,
	profile,
};