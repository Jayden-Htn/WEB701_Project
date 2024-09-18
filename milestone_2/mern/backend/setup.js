const db = require("./app/models");
const Role = db.role;
const Category = db.category;
const Item = db.item;

async function initial() {
    try {
        let count = await Role.estimatedDocumentCount();
        if (count === 0) {
            await new Role({ name: "beneficiary" }).save();
            await new Role({ name: "staff" }).save();
            await new Role({ name: "admin" }).save();
            console.log("Added 'user', 'staff' and 'admin' to roles collection");
        }
        
        count = await Category.estimatedDocumentCount();
        if (count === 0) {
            await new Category({ name: "phone" }).save();
            await new Category({ name: "computer" }).save();
            await new Category({ name: "tablet" }).save();
            await new Category({ name: "charger" }).save();
            await new Category({ name: "audio" }).save();
            await new Category({ name: "other" }).save();
            console.log("Added categories to categories collection");
        }
    
        count = await Item.estimatedDocumentCount();
        if (count === 0) {
            await new Item({ name: "Phone", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b274" }).save();
            await new Item({ name: "Computer", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b276" }).save();
            await new Item({ name: "Tablet", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b278" }).save();
            console.log("Added example items to items collection");
        }
    } catch (err) {
      console.error("Error during initial setup:", err);
    }
}
  
module.exports = { initial };