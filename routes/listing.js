const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingModel = require('../models/listing.js');
const { joiSchema } = require("../joiSchema.js");
const ExpressError = require('../utils/express_error.js');
const {isLoggedIn}=require("../routes/middlewares/middleware.js");


const validateSchema = (req, res, next) => {
    const result = joiSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else { next(); }
}

router.get('/', wrapAsync(async (req, res) => {

    const hotels = await listingModel.find();

    res.render('index', { hotels });
}));

router.post('/', validateSchema, wrapAsync(async (req, res) => {


    const data = req.body;
    if (!data) {
        throw new ExpressError(400, 'Data Are Required');
    }

    const listingOne = new listingModel(
        {
            title: data.name,
            description: data.desc,
            price: data.price,
            image: data.image,
            location: data.location,
            country: data.country,
            reviews: []
        }
    );
    await listingOne.save();
    res.redirect('/listings');
}));

router.get('/new',isLoggedIn, (req, res) => {
    { res.render('new'); }
});

router.get('/:id', wrapAsync(async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id).populate('reviews');


    res.render('details', { hotel });
}));





router.delete('/:id',isLoggedIn, wrapAsync(async (req, res) => {
   
    {await listingModel.findByIdAndDelete(req.params.id);
    res.redirect('/listings');}
}));

router.get('/:id/edit',isLoggedIn, wrapAsync(async (req, res) => {

   { const { id } = req.params;
    const hotel = await listingModel.findById(id);

    res.render('edit', { hotel });}
}));

router.put('/:id',isLoggedIn, validateSchema, wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) 
        res.redirect("/login");else
    {const data = req.body;
    await listingModel.findByIdAndUpdate(req.params.id, {
        title: data.name,
        description: data.desc,
        price: data.price,
        image: data.image,
        location: data.location,
        country: data.country
    });
    res.redirect(`/listings/${req.params.id}`);}
}));


module.exports = router;