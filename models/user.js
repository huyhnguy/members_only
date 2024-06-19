const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    username: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, required: true, maxLength: 100 },
    membership_status: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    }
});

UserSchema.virtual("full_name").get(function () {
    let fullname = "";
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`;
    }

    return fullname;
});

module.exports = mongoose.model("User", UserSchema);
