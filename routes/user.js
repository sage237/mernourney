const express = require('express');
const router = express.Router();
const { userSchema } = require('../joiSchema.js');
const ExpressError = require('../utils/express_error.js');
const wrapAsync = require('../utils/wrapAsync.js');

const passport = require('passport');
const { saveUrl } = require('./middlewares/middleware.js');
const userController=require("../controllers/user.js");

const validateSchema = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else { next(); }
}


router.get("/", (req, res) => {
    res.send('Hello');
});

router.route("/signup")
.get(userController.renderSignUpform )
.post( validateSchema, wrapAsync(userController.signUp));;

router.route('/login')
.get( userController.renderLoginForm)
.post( saveUrl, passport.authenticate("local"), wrapAsync(userController.login));

router.get("/logout", userController.logout);

module.exports = router;