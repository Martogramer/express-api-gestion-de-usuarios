const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  dueDate: Joi.date().required()
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task; 
