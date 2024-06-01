const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const taskSchema = require('../schemas/taskSchema');

router.post('/', auth, validate(taskSchema), taskController.createTask);
router.get('/:id', auth, taskController.getTask);
router.put('/:id', auth, validate(taskSchema), taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
