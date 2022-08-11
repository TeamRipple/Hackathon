const mongoose = require('mongoose');
const Joi = require("joi");
// Providing schema to tags collection in forum database
const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  used: {
    type: Number,
    default: 0
  }
});

const Tag = mongoose.model("Tag", tagSchema);

//function for validation of tags
function validateTag(tag) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(25),
  });
  return schema.validate(tag);
}
exports.Tag = Tag;
exports.tagSchema = tagSchema;
exports.validateTag = validateTag;

// 
// the below code creates a tag , can be used if required 
// 
// async function CreateTag() {
//   const b = new Tag({
//     name: 'Housing',
//     used: 0
   
//   });
//   await b.save();
  

// }
// CreateTag();


