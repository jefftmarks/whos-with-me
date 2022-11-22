require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// Routers
const authRouter = require('./routes/auth');

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);

// Connect to mongoDB database
const start = async () => {
	try {
		connectDB(process.env.MONGO_URI);
		app.listen(3000, console.log('Server is listening on port 3000...'));
	} catch (error) {
		console.log(error);
	}
}

start();