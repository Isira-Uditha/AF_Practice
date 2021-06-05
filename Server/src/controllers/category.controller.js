const Category = require('../models/Category.model');
const mongoose = require('mongoose').set('debug', true);

const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllCategories = async (req, res) => {
    await Category.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getVehiclesForCategories = async (req, res) => {

    if (req.params && req.params.id) {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id');

        await Category.findById(req.params.id)
            .populate("vehicles","title model type name")
            .then(data => {
                res.status(200).send({ data : data });
                console.log(data);
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// const calculateTripCost = async (req, res) => {
//     if (req.params && req.params.id && req.params.trip_type && req.params.duration) {
//         if(req.params.trip_type == "CAR")
//     }
// }


module.exports = {
    createCategory,
    getAllCategories,
    getVehiclesForCategories
};