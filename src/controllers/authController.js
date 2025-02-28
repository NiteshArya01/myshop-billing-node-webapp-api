const signupModel = require('../models/signupModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;
const nodemailer = require('nodemailer');
// Singn up new shop
const signup = async (req, res) => {
    try {
        // Email validation
        if (req.body.email == '') {
            return res.status(401).json({
                success: false,
                msg: "Email is required"
            })
        }

        // Email checking in database
        const userEmail = await signupModel.find({ email: req.body.email }, { email: true, _id: false });
        if (userEmail.length > 0) {
            return res.status(401).json({
                success: false,
                msg: "The email you have entered is already in use."
            })
        }

        // Phone checking in database
        const userPhone = await signupModel.find({ $and: [{ phone: req.body.phone }, { phone: { $ne: '' } }] }, { phone: true, _id: false });
        if (userPhone.length > 0) {
            return res.status(401).json({
                success: false,
                msg: "This phone no you have entered is already in use.",
            })
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                const shop_record = new signupModel({
                    shop_name: req.body.shop_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hash,
                    user_type: 'Admin',
                    is_active: true
                })
                shop_record.save().then(result => {
                    // const isMailSent = SendEmail(req.body.email);
                    // console.log(isMailSent);
                    res.status(200).json({
                        success: true,
                        msg: "Congratulations on your successful registration! Please check your email for the verification OTP."
                    })

                }).catch(err => {
                    console.log(err);
                    res.status(400).json({
                        success: false,
                        msg: "We're sorry, but we were unable to process your registration at this time. Please try again later.",
                        error: err
                    })
                })
            }
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: "We are experiencing a technical glitch. Please try again later.",
            error: err,
        })
    }
}

SendEmail = async (receiver_email) => {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: 'london.purdy@ethereal.email',
            to: receiver_email,
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: '<p><b>Hello</b> to myself!</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return false;//process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return true;
        });
    });
}

// Login user
const login = async (req, res) => {

    try {
        if (req.body.email == '' && req.body.phone == '') {
            return res.status(401).json({
                success: false,
                msg: "Please enter your email or phone no."
            })
        }
        let query = '';
        if (req.body.email != '') {
            query = { email: req.body.email };
        } else if (req.body.phone != '') {
            query = { phone: req.body.phone };
        } else {
            query = { email: req.body.email, phone: req.body.phone };
        }
        await signupModel.find(query).exec().then(user => {

            if (user.length < 1) {
                res.status(401).json({
                    success: false,
                    msg: "We're sorry, but the user you're trying to reach does not exist in our system."
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (!result) {
                        return res.status(401).json({
                            success: false,
                            msg: "We're sorry, but the password you entered is incorrect. Please ensure that you've entered the correct password and try again."
                        })
                    }

                    if (result) {
                        const token = jwt.sign({
                            id: user[0]._id,
                            username: user[0].shop_name,
                            email: user[0].email,
                            user_type: user[0].user_type
                        }, secret_key, { expiresIn: '24h' }, (err, token) => {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    msg: "We're sorry, but we were unable to process your login at this time. Please try again later."
                                })
                            }
                            res.status(200).json({ success: true, msg: 'Welcome back! You have successfully logged in.', token });
                        })
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                msg: "Login Failed."
            })
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: "We are experiencing a technical glitch. Please try again later.",
            error: err,
        })
    }
}

module.exports = {
    signup,
    login
}