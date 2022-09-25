import express from 'express'
import { contactsController, messageController } from '../controllers'


const router = express.Router();

// contacts routes
router.get('/contacts', contactsController.getContacts)
router.get('/contact/:id', contactsController.getOneContact)
router.post('/contact', contactsController.addContact)
router.put('/contact/:id', contactsController.updateContact)
router.delete('/contact/:id', contactsController.deleteContact)

// admin route
router.get('/messages', messageController.getMessage)
router.post('/message', messageController.addMessage)
router.delete('/message/:id', messageController.deleteMessage)

export default router