import CustomErrorhandler from '../services/CustomErrorHandler';
import { Contact, Message } from '../models'
import Joi from 'joi'

const contactsController = {

    // fetching all users
    async getContacts(req, res, next) {

        let documents;

        try {
            documents = await Contact.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    // fetching one user by id
    async getOneContact(req, res, next) {

        let documents;

        try {
            documents = await Contact.findOne({ _id: req.params.id }).select('-updatedAt -__v');
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },


    // deleteing user
    async deleteContact(req, res, next) {

        let contact;
        try {
            contact = await Contact.findOneAndRemove({ _id: req.params.id });

            if (!contact) {
                return next(CustomErrorhandler.alreadyExists("nothing to delete"))
            }

        } catch (err) {
            return next(err);
        }

        res.json(contact);
    },

    // updating user
    async updateContact(req, res, next) {

        const registerSchema = Joi.object({
            firstname: Joi.string().max(30).min(3).required(),
            lastname: Joi.string().max(30).min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            address: Joi.string().max(50).min(3).required(),
            gender: Joi.string().required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { name, email, phone, address, area } = req.body;

        let contact;

        try {
            contact = await Contact.findOneAndUpdate({ _id: req.params.id }, {
                firstname,
                lastname,
                email,
                phone,
                address,
                gender
            }, { new: true });


        } catch (err) {
            return next(err);
        }

        res.json({ contact });
    },


    // adding new user
    async addContact(req, res, next) {

        // checking validation error
        const registerSchema = Joi.object({
            firstname: Joi.string().max(30).min(3).required(),
            lastname: Joi.string().max(30).min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            address: Joi.string().max(50).min(3).required(),
            gender: Joi.string().required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // checking user already exists
        try {
            const exist = await Contact.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorhandler.alreadyExists('This email is already exists'));
            }
        } catch (err) {
            return next(err);
        }

        const { firstname, lastname, email, phone, address, gender } = req.body;

        const contact = new Contact({
            firstname,
            lastname,
            email,
            phone,
            address,
            gender
        })

        let id;

        try {
            const result = await contact.save();
            id = result._id;
        } catch (error) {
            return next(error);
        }

        res.json({ data: id });
    }

}

export default contactsController;