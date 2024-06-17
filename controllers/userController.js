const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');


exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up", {
        title: "Sign Up Form",
        errors: undefined,
    });
});

exports.sign_up_post = [
    body("username", "username required")
        .trim()
        .isLength({ min: 1 })
        .isEmail()
        .withMessage("username must be an email")
        .escape(),
    body("password", "password required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("confirm_password", "confirm password required")
        .trim()
        .isLength({ min: 1 })
        .custom((val, { req }) => {
            if (val !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
        .escape(),
    body("first_name", "first name required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("last_name", "last name required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
        
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("sign-up", {
                title: "Sign Up Form",
                errors: errors.array(),
            });
            return;
        } else {
            bcrypt.hash(req.body.password, 10, async( err, hashedPassword) => {
                if (err) {
                    console.log(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                    });
                    const result = await user.save();
                    res.redirect('/');
                }
            })
        }
    })
];

