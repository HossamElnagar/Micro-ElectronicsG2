const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {

        const { name, quantity, price } = req.body;

        // validation
        if (!name || !price)
            return res.status(400).json({ msg: "missing required data" });

        //user validate
        if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: "Access denied: Admins only" });
        }
        const product = await Product.create({
            name,
            quantity,
            price
        });

        res.status(201).json({
            msg: "Product Created Successfully",
            data: product
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    createProduct
};
