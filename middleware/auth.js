const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
	const authHeaders = req.headers.authorization;

	if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid authentication'});
	}

	const token = authHeaders.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {userId: payload.userId};
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid authentication'});
	}
};

module.exports = auth;