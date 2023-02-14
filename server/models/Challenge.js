const { Schema, model } = require('mongoose');

const challengeSchema = new Schema(
    {
        challengerId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        inviteeId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        word:{
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    }
)

const Challenge = model('challenge', challengeSchema);

module.exports = Challenge;