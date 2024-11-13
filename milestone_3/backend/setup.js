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
            const donatorRole = await new Role({ name: "donator" }).save();
            console.log("Added roles to roles collection");

            roleIds.beneficiary = beneficiaryRole._id;
            roleIds.staff = staffRole._id;
            roleIds.admin = adminRole._id;
            roleIds.donator = donatorRole._id;
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
            const phoneItem = await new Item({ name: "Phone", description: "Description", price: 60, quantityAvailable: 3, category: "66f74e4c2f8b243641d205b8" }).save();
            await new Item({ name: "Computer", description: "Description", price: 60, quantityAvailable: 3, category: "66f74e4c2f8b243641d205ba" }).save();
            await new Item({ name: "Tablet", description: "Description", price: 60, quantityAvailable: 3, category: "66f74e4c2f8b243641d205bc" }).save();
            console.log("Added example items to items collection");

            itemIds.phone = phoneItem._id;
        }

        count = await User.estimatedDocumentCount();
        if (count === 0) {
            await new User({ firstName: "Bob", lastName: "Smith", email: "beneficiary@gmail.com", password: "$2a$08$y/38pJ1N7OpJqSZuJnOKCOCapq3UMjUKqDVfKOs4URvoHTxrUdrhK", 
                organisation: "", tokens: 200, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.beneficiary, purchases: [itemIds.phone, itemIds.phone] }).save();
            await new User({ firstName: "Steve", lastName: "Smith", email: "staff@gmail.com", password: "$2a$08$LgXPtEHjf/XBRQs0xbZV0ez3znS0JzDYkux2uSsrEx0jbkv27F.4C", 
                organisation: "", tokens: 0, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.staff, purchases: [] }).save();
            await new User({ firstName: "Adam", lastName: "Smith", email: "admin@gmail.com", password: "$2a$08$dunM.GAMVu7Jtcm31zVpvu/XdKDpBH4kHdzwSvG0OtZZMoXN0Wx6u", 
                organisation: "", tokens: 0, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.admin, purchases: [] }).save();
            await new User({ firstName: "Dave", lastName: "Smith", email: "donator@gmail.com", password: "$2a$08$4pgZ.70Z2NPW369JvSccCORCAQVkCAEOOuf0ImgFwAC4Z9djefVky", 
                organisation: "", tokens: 0, tokenExpiry: new Date("2024-09-15T22:06:39.000+00:00"), role: roleIds.donator, purchases: [] }).save();
            console.log("Added user accounts to user collection");
        }
    } catch (err) {
      console.error("Error during initial setup:", err);
    }
}
  
module.exports = { initial };