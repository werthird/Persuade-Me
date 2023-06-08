const { Schema, model } = require('mongoose');


const lobbySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    host: {
        type:String,
        required: 'Must be created by a user'
    },
    status: {
        type: String,
        default: 'Active'
    },
    topic: {
        type: String,
        required: 'Debate topic must be decided before lobby creation.'
    },
    teamA:[{
        type: String
    }],
    teamB:[{
        type: String
    }],
    admin:[{
        type: String
    }]
});

lobbySchema.pre('save', function getDate(next) {
    let newLobby = this;
    newLobby.createdAt = Date.now();
    next();
})

const Lobby = model('Lobby', lobbySchema);

module.exports = Lobby;