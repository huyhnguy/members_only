const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.sign_up = asyncHandler(async (req, res, next) => {
    res.render("sign-up", {
        title: "Sign Up Form",
    });
});
