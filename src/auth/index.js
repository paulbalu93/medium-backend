import atob from 'atob';
import bcrypt from 'bcrypt';
import MediumUserModel from '../services/users/schema.js';

export const basicAuth = async (req, res, next) => {
	if (!req.headers.authorization) {
		const error = new Error('Please provide auth');
		error.httpStatusCode = 401;
		next(error);
	} else {
		console.log('Basic Auth middleware: ', req.headers.authorization);
		const decoded = atob(req.headers.authorization.split(' ')[1]);
		console.log(decoded);
		const [email, password] = decoded.split(':');
		const user = await MediumUserModel.findOne({ email });
		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				next();
			} else {
				const error = new Error('Wrong Credentials');
				error.httpStatusCode = 401;
				next(error);
			}
		} else {
			const error = new Error('Wrong Credentials');
			error.httpStatusCode = 401;
			next(error);
		}
	}
};
