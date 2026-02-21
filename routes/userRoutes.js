const express = require("express");
const router = express.Router();
const { userRegister, userLogin} = require("../controllers/userController");
const { createProduct, getAllProducts } = require("../controllers/productController");

router.post("/register",userRegister);

router.post("/login",userLogin);
router.post("/newProduct",createProduct);
router.post("/getAllProduct", getAllProducts);

module.exports = router;
