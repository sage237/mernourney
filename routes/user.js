const express = require('express');
const router = express.Router();
const { userSchema } = require('../joiSchema.js');
const ExpressError = require('../utils/express_error.js');
const wrapAsync = require('../utils/wrapAsync.js');
const User = require("../models/user.js");
const passport = require('passport');

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


router.post("/signup", validateSchema, wrapAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ username: username, email: email });
    await User.register(user, password);

    res.send(`Save User Here ${JSON.stringify(user)}`,);

}));

router.get("/login", (req, res) => {
    res.render('userLogin.ejs');
});


router.post("/login",passport.authenticate("local"), wrapAsync(async (req, res) => {
    // const { email, username, password } = req.body;
    // const user = new User({ username: username, email: email });
    // await User.register(user, password);

    res.redirect("/listings");

}));


module.exports = router;