const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        require: true
    },
    duedate:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;