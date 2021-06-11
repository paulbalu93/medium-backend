import express from 'express';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import usersRouter from './services/users/index.js';

const server = express();

const port = process.env.PORT;

server.use(express.json());

server.use('/users', usersRouter);
// server.use(cookieparser)

console.table(listEndpoints(server));

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
	console.log('succesfully connected to monngodb');
	server.listen(port, () => {
		console.log('server is listening on port', port);
	});
});
mongoose.connection.on('error', (err) => {
	console.log(err);
});
