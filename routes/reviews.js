const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const listingModel=require('../models/listing.js');

const reviewModel=require('../models/reviewSchema.js');
const {joiSchema,reviewSchema}=require("../joiSchema.js");
const ExpressError = require('../utils/express_error.js');

const validateReviewSchema=( req,res,next)=>{
    const result= reviewSchema.validate(req.body);
    if(result.error){
     throw new ExpressError(404,result.error);
    }
    else {next();}
}

router.delete('/:reviewID',wrapAsync(async(req,res)=>{
    let {id,reviewID}=req.params;
   await listingModel.findByIdAndUpdate(id,{$pull:{reviews:reviewID}});
  await  reviewModel.findByIdAndDelete(reviewID);
  res.redirect(`/listings/${id}`);
    console.log('Review Deletion recieved');
}));

router.post('/',validateReviewSchema, wrapAsync(async (req, res) => {
    console.log('New Review Request');
    const { id } = req.params;
    console.log('Listing ID ',id);
    const hotel = await listingModel.findById(id);

    let newReview=new reviewModel(
        req.body.review
    );

    console.log(`${JSON.stringify(req.body)} ${newReview.rating} ${hotel.title}`);
    [].push();
    hotel.reviews.push(newReview);
    await newReview.save();
    await hotel.save();
    const data = req.body;
    
    res.redirect(`/listings/${hotel._id}`);
    // const hotel = await listingModel.findById(id);

    // res.render('details', { hotel });
}));




module.exports=router;