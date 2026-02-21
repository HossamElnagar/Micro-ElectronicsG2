const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {

        const { name, quantity, price, userId } = req.body;

        // validation
        if (!name || !price)
            return res.status(400).json({ msg: "missing required data" });

        const user = await User.findById(userId);
        if (user.role !== 'admin') {
            return res.status(404).json({ msg: "User not found or not an admin" });
        }

        //user validate
       
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
