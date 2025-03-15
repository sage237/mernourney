const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");

const {joiSchema,reviewSchema}=require("../joiSchema.js");
const ExpressError = require('../utils/express_error.js');
const { isLoggedIn } = require('./middlewares/middleware.js');
const reviewController=require("../controllers/review.js");

const validateReviewSchema=( req,res,next)=>{
    const result= reviewSchema.validate(req.body);
    if(result.error){
     throw new ExpressError(404,result.error);
    }
    else {next();}
}

router.delete('/:reviewID',isLoggedIn,wrapAsync(reviewController.deleteReview));

router.post('/',isLoggedIn, validateReviewSchema, wrapAsync(reviewController.addReview));

module.exports=router;