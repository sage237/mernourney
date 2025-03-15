const User = require("../models/user.js");


module.exports.renderSignUpform=(req, res) => {
    res.render('newUser.ejs');
};

module.exports.signUp=async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = new User({ username: username, email: email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
        if (err) {
            next(err);
        } res.redirect("/listings");
    });



};
module.exports.renderLoginForm=(req, res) => {
    res.render('userLogin.ejs');
};

module.exports.login=async (req, res) => {
    res.redirect(res.locals.redirectUrl || "/listings"); ///Or condition checks if redirectUrl is empty (user as logged in from lisings page so isLoggedIn is not called so redirectUrl is undefined)

};

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } res.redirect('/listings');
    }

    );
};