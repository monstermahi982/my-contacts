import CustomErrorhandler from '../services/CustomErrorHandler';
import { Message } from '../models'
import Joi from 'joi'

const messageController = {
    async getMessage(req, res, next) {

        let documents;

        try {
            documents = await Message.find().populate('contact').select('-updatedAt -__v').sort({ _id: -1 }).sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    // deleteing user
    async deleteMessage(req, res, next) {

        let message;
        try {
            message = await Message.findOneAndRemove({ _id: req.params.id });

            if (!message) {
                return next(CustomErrorhandler.alreadyExists("nothing to delete"))
            }

        } catch (err) {
            return next(err);
        }

        res.json(message);
    },

    async addMessage(req, res, next) {

        // checking validation error
        const messageSchema = Joi.object({
            message: Joi.string().max(200).min(3).required(),
            contact: Joi.string().required()
        })

        const { error } = await messageSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { message, contact } = req.body;

        const messageData = new Message({
            message,
            contact
        })

        let id;

        try {
            const result = await messageData.save();
            id = result._id;
        } catch (error) {
            return next(error);
        }

        res.json({ data: messageData });
    }
}

export default messageController;