const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
	try {
		const user = await User.create(req.body);
		const token = user.createJWT();
		res.status(StatusCodes.OK).json({user: user, token});
	} catch (error) {
		res.status(StatusCodes.UNAUTHORIZED).json(error);
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide username and password'});
	}

	const user = await User.findOne({username})
	if (!user) {
		return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Invalid credentials'});
	}

	const passwordIsMatch = await user.comparePassword(password);
	if (!passwordIsMatch) {
		return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Invalid credentials'});
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({user: user, token});

};

const profile = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res.status(StatusCodes.UNAUTHORIZED).json(error);
	}
};

module.exports = {
	register,
	login,
	profile,
};