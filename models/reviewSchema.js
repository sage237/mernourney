const mongoose = require('mongoose');

///Defining mongoose.Schema so that we do not have to call mongoose.Schema({...}) each time
/// using Schema({...}) will do he same work
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    rating: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(), 
       
    },


});

module.exports = mongoose.model('Review', listingSchema);

