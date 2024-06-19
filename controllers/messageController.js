const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const Message = require('../models/message');

exports.create_message_get = (req, res, next) => {
    res.render("create-message", {
        title: "Create Message",
        errors: undefined
    })
}

exports.create_message_post = [
    body("title", "title required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("message", "message required")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("create-message", {
                title: "Create Message",
                errors: errors.array(),
            });
            return;
        } else {
            console.log(req.user);
            const message = new Message({
                title: req.body.title,
                message: req.body.message,
                user: req.user.id,
            })
            const result = message.save();
            res.redirect('/');
        }
    })
]

exports.delete_message = asyncHandler(async (req, res, next) => {
    const message = await Message.findByIdAndDelete(req.body.message).exec();
    res.redirect('/');

})