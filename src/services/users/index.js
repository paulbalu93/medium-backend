import express from 'express';
import { basicAuth } from '../../auth/index.js';

import MediumUserModel from './schema.js';

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
	try {
		const newUser = new MediumUserModel(req.body);
		const { _id } = await newUser.save();
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
});

usersRouter.get('/', basicAuth, async (req, res, next) => {
	try {
		const users = await MediumUserModel.find();
		res.status(200).send(users);
	} catch (error) {
		next(error);
	}
});

// usersRouter.get("/googleLogin", passport.authenticate("google"))
// usersRouter.get("/googleRedirect", passport.authenticate())

export default usersRouter;
