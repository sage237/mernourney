const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingModel = require('../models/listing.js');
const { joiSchema } = require("../joiSchema.js");
const ExpressError = require('../utils/express_error.js');
const { isLoggedIn } = require("../routes/middlewares/middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const upload=multer({dest:'public/images/',filename: (req, file, cb) => {
         cb(null, Date.now() + '-' + file.originalname)}});


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Save files in the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     }
// });
// const upload = multer({ storage });


const validateSchema = (req, res, next) => {
    console.log(req);
    const result = joiSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else { next(); }
}

router.route('/')
.get( wrapAsync(listingController.getAllListings))
.post( isLoggedIn,upload.single("image"), validateSchema,  wrapAsync(listingController.addListings))
// .post(upload.single("image"),(req,res)=>{
// console.log(req.file);
// console.log(req.body);
// })
;

router.get('/new', isLoggedIn, listingController.renderNewListingForm);

router.route('/:id')
.get( wrapAsync(listingController.renderDetailPage))
.delete( isLoggedIn, wrapAsync(listingController.deleteListing))
.put( isLoggedIn, validateSchema, wrapAsync(listingController.editListings));

router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports = router;