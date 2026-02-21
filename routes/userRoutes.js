const express = require("express");
const router = express.Router();
const { userRegister, userLogin} = require("../controllers/userController");
const { createProduct } = require("../controllers/productController");

router.post("/register",userRegister);

router.post("/login",userLogin);
router.post("/newProduct",createProduct);

module.exports = router;
