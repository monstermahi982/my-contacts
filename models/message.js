import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: { type: String, required: true },
    contact: { type: Schema.Types.ObjectId, ref: 'Contact' }
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }} );

export default mongoose.model('Message', messageSchema, 'messages');
