const mongoose = require('mongoose');

///Defining mongoose.Schema so that we do not have to call mongoose.Schema({...}) each time
/// using Schema({...}) will do he same work
const Schema = mongoose.Schema;
const reviewSchema=require('./reviewSchema');
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        type: String,
        default: "Default Link", //When image field is skipped;
        set: (v) => v === "" ? "Default link" : v //When Image field is defined but value is left as empty string

    },
    price: { type: Number, required: true },
    location: { type: String, },
    country: { type: String, },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

});
listingSchema.post('findOneAndDelete',async(listinn)=>{
await reviewSchema.deleteMany({_id:{$in: listinn.reviews}});
});
const listing = mongoose.model('listing', listingSchema);


module.exports = listing;