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
const updateProduct= async(req,res)=>{
     try {
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
            if(!product) return res.status(404).json({msg:"product not found"});
            res.status(200).json({msg:"product updated", data: product})
        } catch (error) {
            console.log(error);
            res.status(400).json({msg:"product update failed"})
        }   
}
const deleteProduct= async (req,res) => {
     try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res.status(404).json({msg:"product not found"});
        res.status(200).json({msg:"product deleted"})
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"product deletion failed"})
    }

    
}

<<<<<<< HEAD
const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            msg: "All Products",
            count: products.length,
            data: products
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    createProduct,
     getAllProducts
=======
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
>>>>>>> f09b0f3807e9062dc02b64581ec180b6eaaaba7f
};
