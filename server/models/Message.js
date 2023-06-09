const { Schema, model } = require('mongoose');


const messageSchema = new Schema({
    author: {
        type: String,
        required: 'Message must be authored by a user.'
    },
    lobby: {
        type: String,
        required: 'Message must belong to a lobby.'
    },
    role: {
        type: String,
        required: 'User must have permissions to send a message.'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    contents: {
        type: String,
        required: 'Message must not be blank.'
    },
    sources:[{
        type: String
    }]
});

messageSchema.pre('save', function getDate(next) {
    let newMessage = this;
    newMessage.timestamp = Date.now();
    next();
})

const Message = model('Message', messageSchema);

module.exports = Message;