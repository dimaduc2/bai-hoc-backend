const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let starWarsModel = new Schema(
  {
    name: String,
    image: String,
    gender: String, 
    species: String, 
    lightsaber: String,
  },
  {collection: 'Star Wars'}          //tên của collection trong MongoDB
);
starWarsModel.index({name:'text', image:'text', gender: 'text', species: 'text', lightsaber: 'text'})
module.exports = mongoose.model('Star Wars', starWarsModel);