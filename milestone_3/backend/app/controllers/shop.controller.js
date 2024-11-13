const db = require("../models");
const User = db.user;
const Item = db.item;
const Category = db.category;

exports.purchaseItem = async (req, res) => {
  try {
    // Find item to purchase
    const item = await Item.findById(req.body.id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    
    // Check if there is an item to purchase
    if (item.quantityAvailable < 1) {
      return res.status(400).send({ message: "No items available for purchase." });
    }
    
    // Find user and populate purchases
    const user = await User.findById(req.userId).populate('purchases', '-__v');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    // Does user have enough tokens
    if (user.tokens < item.price) {
      return res.status(400).send({ message: "Not enough tokens for purchase." });
    }
    
    // Update item quantity
    item.quantityAvailable -= 1;
    await item.save();
    
    // Update user tokens and purchases
    user.tokens -= item.price;
    user.purchases.push(item._id);
    await user.save();
    
    // Get user with new purchase
    const updatedUser = await User.findById(req.userId).populate('purchases', '-__v');
    
    // Build the purchase list
    const purchaseList = updatedUser.purchases.map(purchase => purchase.name.toLowerCase());
    
    res.status(200).send({ tokens: user.tokens, purchases: purchaseList });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.addItem = async (req, res) => {
  console.log("Add item with:", req.body);
  try {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantityAvailable: req.body.quantity,
    });
  
    // Save new user to database
    item.save().then((item) => {
      // Find and map category
      Category.find({name: { $in: req.body.category }}).then((category) => {
          item.category = category.map(category => category._id);
          item.save().then(() => {
            res.send({ message: "Item was registered successfully! Thank you!" });
          }).catch(err => {
            if (err) {
              console.log("Error:", err);
              res.status(500).send({ message: err });
            }
          });
      }).catch((err) => {
          if (err) {
            console.log("Error:", err);
            res.status(500).send({ message: err });
          }
        }
      );
    }).catch((err) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).send({ message: err });
      }
    });
  }
  catch {
    console.log("Error:", err);
    res.status(500).send({ message: err });
  }
};
