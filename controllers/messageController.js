import CustomErrorhandler from '../services/CustomErrorHandler';
import { Message, Contact } from '../models'
import Joi from 'joi'
import { PORT, DB_URL, TEXT_LOCAL } from '../config'
import axios from 'axios'

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

        let contactData = await Contact.findOne({ _id: contact });
        
        var url = `https://api.textlocal.in/send/?apikey=${TEXT_LOCAL}&numbers=${contactData.phone ? contactData.phone : 9370963976 }&sender=TXTLCL&message='+ ${encodeURIComponent(message) }`;

        // Make a request for a user with a given ID
        // sending sms of message
        try {
            axios.post(url)
            .then(function (response) {

                console.log("------ SMS Gateway Response ------");

                console.log(response.data);

            })
            .catch(function (error) {

                console.log(error, " monster");

            })

            .finally(function () {

            });
        } catch (error) {
            return next(error);
        }   

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