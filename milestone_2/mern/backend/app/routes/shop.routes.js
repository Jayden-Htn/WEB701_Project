const { authJwt } = require("../middlewares");
const controller = require("../controllers/shop.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.patch("/api/shop/purchase", [authJwt.verifyToken], controller.purchaseItem);
  // Add is user authJwt.isUser later
};