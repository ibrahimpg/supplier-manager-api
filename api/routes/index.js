const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/authenticate');

const userRegister = require('../controllers/users/register');
const userLogin = require('../controllers/users/login');
const userUpdateEmail = require('../controllers/users/updateEmail');
const userUpdatePicture = require('../controllers/users/updatePicture');
const userUpdateProfile = require('../controllers/users/updateProfile');
const userUpdatePassword = require('../controllers/users/updatePassword');

const contactGet = require('../controllers/contacts/get');
const contactCreate = require('../controllers/contacts/create');
const contactDelete = require('../controllers/contacts/delete');

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.patch('/user/update-email', authenticate, userUpdateEmail);
router.patch('/user/update-picture', authenticate, userUpdatePicture);
router.patch('/user/update-profile', authenticate, userUpdateProfile);
router.patch('/user/update-password', authenticate, userUpdatePassword);

router.post('/contact/get', contactGet);
router.post('/contact/create', contactCreate);
router.delete('/contact/delete', contactDelete);

module.exports = router;
