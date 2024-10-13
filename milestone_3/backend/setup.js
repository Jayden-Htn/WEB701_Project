const db = require("./app/models");
const Role = db.role;
const Category = db.category;
const Item = db.item;
const User = db.user;

async function initial() {
    try {
        let roleIds = {};
        let itemIds = {};

        let count = await Role.estimatedDocumentCount();
        if (count === 0) {
            const beneficiaryRole = await new Role({ name: "beneficiary" }).save();
            const staffRole = await new Role({ name: "staff" }).save();
            const adminRole = await new Role({ name: "admin" }).save();
            console.log("Added roles to roles collection");

            roleIds.beneficiary = beneficiaryRole._id;
            roleIds.staff = staffRole._id;
            roleIds.admin = adminRole._id;
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
            const phoneItem = await new Item({ name: "Phone", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b274" }).save();
            await new Item({ name: "Computer", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b276" }).save();
            await new Item({ name: "Tablet", description: "Description", price: 60, quantityAvailable: 3, category: "66e7b1460d0a09120693b278" }).save();
            console.log("Added example items to items collection");

            itemIds.phone = phoneItem._id;
        }

        count = await User.estimatedDocumentCount();
        if (count === 0) {
            await new User({ firstName: "Bob", lastName: "Smith", email: "beneficiary@gmail.com", password: "$2a$08$y/38pJ1N7OpJqSZuJnOKCOCapq3UMjUKqDVfKOs4URvoHTxrUdrhK", 
                organisation: "", tokens: 200, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.beneficiary, purchases: [itemIds.phone, itemIds.phone] }).save();
            await new User({ firstName: "Steve", lastName: "Smith", email: "staff@gmail.com", password: "$2a$08$LgXPtEHjf/XBRQs0xbZV0ez3znS0JzDYkux2uSsrEx0jbkv27F.4C", 
                organisation: "", tokens: 0, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.staff, purchases: [] }).save();
            console.log("Added user accounts to user collection");
            await new User({ firstName: "Adam", lastName: "Smith", email: "admin@gmail.com", password: "$2a$08$dunM.GAMVu7Jtcm31zVpvu/XdKDpBH4kHdzwSvG0OtZZMoXN0Wx6u", 
                organisation: "", tokens: 0, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.admin, purchases: [] }).save();
        }
    } catch (err) {
      console.error("Error during initial setup:", err);
    }
}
  
module.exports = { initial };