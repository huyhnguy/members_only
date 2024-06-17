const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: Schema.Types.ObjectId,
    text: {
        type: String,
        required: true,
    },
    title: { type: String, required: true, maxLength: 100 },
    timestamp: { type: Date, default: Date.now() },
})