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