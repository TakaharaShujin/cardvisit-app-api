const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cardvisits');

const modelInfo = { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } };

const CardsSchema = {
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  company: {
    type: String,
    required: true
  },
  company_position: {
    type: String,
    required: true
  },
  status: {
    type: String
  }
};

const UserSchema = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true,
  },
  status: {
    type: String
  }
};





module.exports = {
  Cards: mongoose.model('Cards', new Schema(CardsSchema, modelInfo)),
  User: mongoose.model('User', new Schema(UserSchema, modelInfo))
};
