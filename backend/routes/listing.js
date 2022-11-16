const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const authOnlyMiddleware = require("../middlewares/authOnly");
const filterData = require("../utils/filterData");
const config = require("../config");


//get all products
router.get("/all", authOnlyMiddleware([]), async (req, res) => {
	const products = await Product.find()
  if(!products) return res.status(400).json({msg: "Bhadwe"})
  res.status(200).json({msg: products})
});

//add new product
router.post("/newproduct", authOnlyMiddleware([]), async(req, res) => {
  const product = req.body;

  if(!product) return res.status(400).json({msg : "Body Not Available"})
  if(!product.name) return res.status(400).json({msg: "No name found in body"})
  if(!product.price) return res.status(400).json({msg: "No price found in body"})
  product.user = req.auth.user

  try {
    const newProduct = new Product(product)
    return res.send(await newProduct.save());
  } catch (err) {
    return res.status(500).json({msg: err})
  }
})

//create new cart
router.post("/newcart", authOnlyMiddleware([]), async(req, res) => {
  try {
    const newCart = new Cart({products: [], user: req.auth.user})
    return res.send(await newCart.save());
  } catch (err) {
    return res.status(500).json({msg: err})
  }
})

//add product to cart
router.post("/add-to-cart", authOnlyMiddleware([]), async(req, res) => {
  const cart = req.body;

  if(!cart) return res.status(400).json({msg : "Body Not Available"})
  if(!cart.product) return res.status(400).json({msg: "Product Not available in body"})

  const cartFound = await Cart.findOne({user: req.auth.user})
  if(!cartFound) return res.status(400).json({msg: "Create a cart first"})
  
  cartFound.products.push(cart.product)

  try {
    return res.send(await cartFound.save())
  } catch (err) {
    return res.status(500).json({msg: err})
  }
})

//get all carts
router.get("/allcarts", authOnlyMiddleware([]), async (req, res) => {
  const carts = await Cart.find()
  if(!carts) return res.status(400).json({msg: "Bruh"})
  res.status(200).json({msg: carts})
})

//get cart by user
router.get("/cart-by-user", authOnlyMiddleware([]), async(req, res) => {
  const cart = await Cart.findOne({user: req.auth.user})
  if(!cart) return res.status(400).json({msg: "Cart not found"})
  res.status(200).json({msg: cart})
})

module.exports = router;
