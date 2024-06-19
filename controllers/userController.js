const User = require('../models/user');
const Message = require('../models/message')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.index_get = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().populate("user").sort({ timestamp: -1 }).exec();
    
    if (req.user) {
        res.render("index", {
            title: 'Members Only',
            user: req.user,
            messages: allMessages,
          })
    } else {
        res.render("index", {
            title: 'Members Only',
            user: undefined,
            messages: allMessages,
          })
    }

})

exports.sign_up_get = function (req, res, next) {
    res.render("sign-up", {
        title: "Sign Up Form",
        errors: undefined,
    });
};

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

exports.log_in_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  });

exports.log_out_get = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }

exports.join_club_get = asyncHandler(async (req, res, next) => {
    res.render('join-club', {
        errors: undefined,
    });
})

exports.join_club_post = [
    body("code", "code required")
        .trim()
        .custom((val) => {
            if (val !== '1225') {
                throw new Error('Wrong passcode');
            }
            return true;
        })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user._id).exec()

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("join-club", {
                errors: errors.array(),
            });
            return;
        } else {
            user.membership_status = true;
            const result = await user.save();
            res.redirect('/');
        }
    })
]