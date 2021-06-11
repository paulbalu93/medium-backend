import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, requireed: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ['Admin', 'User'] },
});

export default model('MediumUser', UserSchema);
