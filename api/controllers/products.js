// The ORM
const mongoose = require('mongoose');

// The model
const Product = require('../models/product');

// Add product to database
exports.product_add = (req, res, next) => {    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImageUrl: req.file ? req.file.path : "uploads/no-image.png", // default image
        category: req.body.category
    });
    product.save()
        .then(result => {            
            res.status(201).json({
                message: 'Created product',
                product: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    productImageUrl: result.productImageUrl,
                    category: result.category
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });    
};

// Get a list of products
exports.products_get_all = (req, res, next) => {
    // Pulling from database
    Product.find().sort({ name: 1 }) // Sort by name in ascending order
        .select('name price _id productImageUrl category') // Define what fields you want to pass to results
        .exec()        
        .then(docs => {
            //console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        productImageUrl: doc.productImageUrl,
                        category: doc.category
                    }
                })
            };
            res.status(200).json(response);            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Delete a product from database
exports.product_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json({
                message: "Product deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};