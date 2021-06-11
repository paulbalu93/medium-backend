import express from 'express';
import MediumUserModel from './schema.js';
const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
	try {
		const newUser = new MediumUserModel(req.body);
		const { _id } = await newUser.save();
	} catch (error) {
		next(error);
	}
});

// usersRouter.get("/googleLogin", passport.authenticate("google"))
// usersRouter.get("/googleRedirect", passport.authenticate())

export default usersRouter;
