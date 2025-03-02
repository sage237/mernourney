const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

///Defining mongoose.Schema so that we do not have to call mongoose.Schema({...}) each time
/// using Schema({...}) will do he same work
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, required: true }
});

/// This adds username, hash and salt field to schema to sae username, hashed password and salt value.
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);