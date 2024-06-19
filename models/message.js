const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true,
    },
    title: { type: String, required: true, maxLength: 100 },
    timestamp: { type: Date, default: Date.now() },
});

MessageSchema.virtual("timestamp_formatted").get(function () {
    const formattedDate = this.timestamp.toLocaleString(DateTime.DATETIME_MED);
    return formattedDate;
});

module.exports = mongoose.model("Message", MessageSchema);
