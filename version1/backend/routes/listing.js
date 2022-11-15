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

//add product to cart
router.post("/add-to-cart", authOnlyMiddleware([]), async(req, res) => {
  const cart = req.body;

  if(!cart) return res.status(400).json({msg : "Body Not Available"})
  if(!cart.product) return res.status(400).json({msg: "Product Not available in body"})

  const cartFound = await Cart.findOne({user: req.auth.user})
  if(!cartFound) return res.status(400).json({msg: "Something went wrong"})
  
  cartFound.products.push(cart.product)

  try {
    return res.send(await cartFound.save())
  } catch (err) {
    return res.status(500).json({msg: err})
  }
})

// // get self
// router.get("/self", authOnlyMiddleware([]), async (req, res) => {
// 	res.send(req.auth.user);
// });

// // get user by id
// router.get("/:id", async (req, res) => {
// 	const user = await User.findById(req.params.id);
// 	if (!user) return res.status(404).json({ msg: "user not found" });
// 	res.json(user);
// });

// // get user by username
// router.get("/byusername/:username", async (req, res) => {
// 	const user = await User.findOne({ username: req.params.username });
// 	if (!user) return res.status(404).json({ msg: "user not found" });
// 	res.json(user);
// });

// // get all users
// router.get("/", authOnlyMiddleware(["admin"]), async (req, res) => {
// 	const users = await User.find();
// 	res.send(filterData(users, req.query));
// });

// // patch user
// router.patch("/:id", authOnlyMiddleware(["admin"]), async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);

// 		if (!user) return res.status(404).json({ msg: "user not found" });

// 		const props = Object.getOwnPropertyNames(req.body);
// 		props.forEach((prop) => {
// 			user[prop] = req.body[prop];
// 		});
// 		res.json(await user.save());
// 	} catch (err) {
// 		res.status(500).json({ err });
// 	}
// });

module.exports = router;
