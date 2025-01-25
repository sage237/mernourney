const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const ejsMate = require('ejs-mate');
const listingModel = require('./models/listing');
const { title } = require('process');
const methodOverride = require('method-override');
const ExpressError = require('./utils/express_error.js');
const {joiSchema}=require("./joiSchema.js");
const wrapAsync = require("./utils/wrapAsync.js");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));

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
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnbDB');
}

const validateSchema=( req,res,next)=>{
    const result= joiSchema.validate(req.body);
    if(result.error){
     throw new ExpressError(404,result.error);
    }
    else {next();}
}

app.get("/", (req, res) => {
    res.status(200).send(
        'API is working correctly'
    );
});



app.get('/listings', wrapAsync(async (req, res) => {

    const hotels = await listingModel.find();

    res.render('index', { hotels });
}));

app.post('/listings',validateSchema, wrapAsync(async (req, res) => {

  
    const data = req.body;
    if(!data){
        throw new ExpressError(400,'sfsdgfhks');
    }

    const listingOne = new listingModel(
        {
            title: data.name,
            description: data.desc,
            price: data.price,
            image: data.image,
            location: data.location,
            country: data.country
        }
    );
    await listingOne.save();
    res.redirect('/listings');
}));

app.get('/listings/new', (req, res) => {
    res.render('new');
});

app.get('/listings/:id', wrapAsync(async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id);

    res.render('details', { hotel });
}));

app.delete('/listings/:id', wrapAsync(async (req, res) => {

    await listingModel.findByIdAndDelete(req.params.id);
    res.redirect('/listings');
}));

app.get('/listings/:id/edit', wrapAsync(async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id);

    res.render('edit', { hotel });
}));

app.put('/listings/:id',validateSchema, wrapAsync(async (req, res) => {
    console.log('Edit Called');
    const data = req.body;
    await listingModel.findByIdAndUpdate(req.params.id, {
        title: data.name,
        description: data.desc,
        price: data.price,
        image: data.image,
        location: data.location,
        country: data.country
    });
    res.redirect('/listings');
}));

app.all("*", (req, res, next) => {

    const err = new ExpressError(404, 'Page Not Found!!');

    next(err);
});
app.use((err, req, res, next) => {

    let { statusCode=500, message="Something Went Wrong" } = err;
    res.status(statusCode).send(message);
});
