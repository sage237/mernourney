require('dotenv').config()
// console.log(process.env.SECRET);

const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/express_error.js');
const { joiSchema, reviewSchema } = require("./joiSchema.js");

const wrapAsync = require("./utils/wrapAsync.js");


const lisingsRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');

///For session
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const passportLocalStrategy = require('passport-local');
const User = require('./models/user.js');


const app = express();
const port = 8080;
const dbUrl = process.env.ATLASDB_URL;
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SESSION_SECRET
    },
    touchAfter: 24 * 3600
})


app.use(expressSession({ store, secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.engine('ejs', ejsMate);

app.listen(port, () => {
    console.log(`App is listeming on port ${port}`);
});

main().then(() => {

}).catch((e) => {
    console.log('Exception while connnection to database: '.e);
});

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/airbnbDB');
    await mongoose.connect(dbUrl);
}

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});



app.get("/", (req, res) => {
    res.status(200).send(
        'API is working correctly'
    );
});




app.use('/listings', lisingsRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);



app.all("*", (req, res, next) => {

    const err = new ExpressError(404, 'Page Not Found!!');

    next(err);
});
app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).send(message);
});