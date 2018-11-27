const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ****** MULTER OPTIONS, this module allows requests to upload not only plain text but also files **********************************
// The one that allows us to upload files
const multer = require('multer');
// Indicate to multer how and where to upload the files
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // Original approach but windows does not allowed ":" in file names
        // var fileName = new Date().toISOString() + file.originalname;
        const fileName = new Date().getTime() + "_" + file.originalname;
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    // Evaluate if we want to upload the file or not
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const multerUpload = multer({
    storage: multerStorage,
    limits: {
        fieldSize: 1024 * 1024 * 5 // Up to 5Mb
    },
    fileFilter: fileFilter
});
// ****** MULTER OPTIONS, END - SECTION **********************************

// Get middleware to force API call to authenticate when trying to create a product
const checkAuth = require('../middleware/check-auth');

// Let's use Controller approach instead
const ProductController = require('../controllers/products');

// Get a list of all resources
router.get('/', ProductController.products_get_all)
// Add resource, notice user must be logged in
router.post('/', checkAuth, multerUpload.single('productImageUrl'), ProductController.product_add);
// Delete resource, notice user must be logged in
router.delete('/:productId', checkAuth, ProductController.product_delete);

// Make it visible
module.exports = router;