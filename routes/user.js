const express = require('express');
const router = express.Router();
const { userSchema } = require('../joiSchema.js');
const ExpressError = require('../utils/express_error.js');
const wrapAsync = require('../utils/wrapAsync.js');
const User = require("../models/user.js");
const passport = require('passport');
const { saveUrl } = require('./middlewares/middleware.js');

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
router.get("/signup", (req, res) => {
    res.render('newUser.ejs');
});


router.post("/signup", validateSchema, wrapAsync(async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = new User({ username: username, email: email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
        if (err) {
            next(err);
        } res.redirect("/listings");
    });



}));

router.get("/login", (req, res) => {
    res.render('userLogin.ejs');
});


router.post("/login", saveUrl, passport.authenticate("local"), wrapAsync(async (req, res) => {
    // const { email, username, password } = req.body;
    // const user = new User({ username: username, email: email });
    // await User.register(user, password);
    console.log(req.originalUrl);


    res.redirect(res.locals.redirectUrl || "/listings"); ///Or condition checks if redirectUrl is empty (user as logged in from lisings page so isLoggedIn is not called so redirectUrl is undefined)

}));
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } res.redirect('/listings');
    }

    );
});


module.exports = router;