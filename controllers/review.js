const listingModel=require("../models/listing.js");

const reviewModel=require('../models/reviewSchema.js');

module.exports.addReview=async (req, res) => {
    console.log('New Review Request');
    const { id } = req.params;
    console.log('Listing ID ',id);
    const hotel = await listingModel.findById(id);

    let newReview=new reviewModel(
        req.body.review
    );
    newReview.owner=req.user._id;

    console.log(`${JSON.stringify(req.body)} ${newReview.rating} ${hotel.title}`);
  
    hotel.reviews.push(newReview);
    await newReview.save();
    await hotel.save();
    const data = req.body;
    
    res.redirect(`/listings/${hotel._id}`);
    // const hotel = await listingModel.findById(id);

    // res.render('details', { hotel });
};
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewID}=req.params;
   await listingModel.findByIdAndUpdate(id,{$pull:{reviews:reviewID}});
  await  reviewModel.findByIdAndDelete(reviewID);
  res.redirect(`/listings/${id}`);
    console.log('Review Deletion recieved');
};