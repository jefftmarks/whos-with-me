require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// Routers
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');

// Auth
const authenticateUser = require('./middleware/auth');

// Error handling
const routeNotFound = require('./middleware/route-not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', authenticateUser, eventRouter);

app.use(routeNotFound);
app.use(errorHandlerMiddleware);

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