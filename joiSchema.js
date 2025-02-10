const Joi = require('joi');
module.exports. joiSchema = Joi.object(
    {
        name: Joi.string().required(),
        desc: Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow("",null),
        
        location:Joi.string().required().min(0),
        
        country:Joi.string().required(),
    }

);

module.exports. reviewSchema = Joi.object(

   { review:Joi.object(
    {
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
       
    }
   ).required()}
    

);