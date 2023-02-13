const { Schema, model } = require('mongoose');

const gameSchema = new Schema ({
    word: {
        type: String,
        required: true,

    },
});