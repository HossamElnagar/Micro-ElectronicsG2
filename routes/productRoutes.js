const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts,updateProduct,deleteProduct } = require("../controllers/productController");


router.post("/products",createProduct);
router.get("/products", getAllProducts);
router.put("/products",updateProduct);
router.delete('/products',deleteProduct);

module.exports = router;