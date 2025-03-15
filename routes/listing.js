const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingModel = require('../models/listing.js');
const { joiSchema } = require("../joiSchema.js");
const ExpressError = require('../utils/express_error.js');
const { isLoggedIn } = require("../routes/middlewares/middleware.js");
const listingController = require("../controllers/listing.js");

const validateSchema = (req, res, next) => {
    const result = joiSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else { next(); }
}

router.route('/')
.get( wrapAsync(listingController.getAllListings))
.post( isLoggedIn, validateSchema, wrapAsync(listingController.addListings));

router.get('/new', isLoggedIn, listingController.renderNewListingForm);

router.route('/:id')
.get( wrapAsync(listingController.renderDetailPage))
.delete( isLoggedIn, wrapAsync(listingController.deleteListing))
.put( isLoggedIn, validateSchema, wrapAsync(listingController.editListings));

router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports = router;