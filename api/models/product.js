/**
 * Define a schema of what our product should look like
 */
const mongoose = require('mongoose');

/**
 * Note how field names are declared in order to make them as mandatory fields
 * 
 */
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImageUrl: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Product', productSchema);