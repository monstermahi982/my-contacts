import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Contact', userSchema, 'contacts');