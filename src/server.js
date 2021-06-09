import express from 'express';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';

const server = express();

const port = process.env.PORT;

server.use(express.json());

server.use('/users', usersRoutes);

console.table(listEndpoints(server));

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
