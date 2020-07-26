
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});

// Export the model
module.exports = mongoose.model('Todo', TodoSchema);
