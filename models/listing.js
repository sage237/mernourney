const mongoose = require('mongoose');

///Defining mongoose.Schema so that we do not have to call mongoose.Schema({...}) each time
/// using Schema({...}) will do he same work
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imge: {
        type: String,
        default: "Default Link", //When image field is skipped;
        set: (v) => v === "" ? "Default link" : v //When Image field is defined but value is left as empty string

    },
    price: { type: Number, required: true },
    location: { type: String, },
    country: { type: String, },

});

const listing = mongoose.model('listing', listingSchema);

module.exports = listing;