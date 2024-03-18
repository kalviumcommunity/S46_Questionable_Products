const joi = require("joi");

const userJoiSchema = joi.object({
  username: joi.string().min(3).max(20).lowercase().required(),
  email: joi.string().required().email().lowercase(),
  password: joi.string().required().min(5).max(20),
  confirmPassword: joi.ref("password"),
});
const productJoiSchema = joi.object({
  title: joi.string().max(100),
  description: joi.string().max(1000),
  category: joi.string(),
  image: joi.string(),
  votes: joi.number(),
  postedBy: joi.string(),
});

module.exports = {
  userJoiSchema,
  productJoiSchema,
};
