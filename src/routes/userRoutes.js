const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userSchema = require('../schemas/userSchema');

router.post('/', validate(userSchema), userController.createUser);
router.post('/login', userController.login);
router.get('/:id', auth, userController.getUser);
router.put('/:id', auth, validate(userSchema), userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
