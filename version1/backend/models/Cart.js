const mongoose = require("mongoose");
const config = require("../config");

const cartSchema = mongoose.Schema(
	{
		products: {
			type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
			required: true,
		},
    user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
