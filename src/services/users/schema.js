import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, requireed: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ['Admin', 'User'] },
});

UserSchema.pre('save', async function (next) {
	const newuser = this;
	const plainPW = newuser.password;
	if (newuser.ismodified('password')) {
		const hashPW = await bcrypt.hash(plainPW, 10);
		newuser.password = hashPW;
	}
	next();
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.__v;
	return userObject;
};

export default model('MediumUser', UserSchema);
