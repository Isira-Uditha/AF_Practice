const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true, trim: true },
    vehicles: [{type: mongoose.Schema.Types.ObjectId, ref: 'vehicles'}],
});

const CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;