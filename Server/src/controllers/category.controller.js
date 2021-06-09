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

const calculateCost = async (req, res) => {
    let cost = 0;
    if (req.body) {
        console.log(req.body);
        if(req.body.title == "Short trips"){
            if(req.body.vehicle == "H3"){
                cost = 100 * req.body.qty;
            }else{
                cost = 200 * req.body.qty;
            }
        }else if(req.body.title == "Long trips"){
            if(req.body.vehicle == "H3"){
                cost = 300 * req.body.qty;
            }else{
                cost = 400 * req.body.qty;
            }
        }else{
            if(req.body.vehicle == "H3"){
                cost = 500 * req.body.qty;
            }else{
                cost = 600 * req.body.qty;

            }
        }

        try{
            res.status(200).send({ cost: cost });
        } catch(error){
            res.status(500).send({ error: error.message });
        };
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
    getVehiclesForCategories,
    calculateCost
};