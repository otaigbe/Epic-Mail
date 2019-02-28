import express from 'express';
import usersImpl from '../impl/users';

const router = express.Router();

router.post('/', usersImpl.sendEmail);

// router.put('/:id', userImpl.modifyRequest);

router.get('/', usersImpl.getAllReceivedEmailsForAParticularUser);

router.get('/:id', usersImpl.getAllUnreadEmailsForAParticularUser);

router.get('/:id', usersImpl.getAllEmailsSentByAParticularUser);

router.get('/:userId/:emailId', usersImpl.getEmailForASpecificUser);

router.delete('/:mailsArray', usersImpl.deleteEmail);

export default router;
