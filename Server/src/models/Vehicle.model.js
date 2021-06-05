const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    categories: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories'}],
});

const VehicleModel = mongoose.model('vehicles', VehicleSchema);
module.exports = VehicleModel;