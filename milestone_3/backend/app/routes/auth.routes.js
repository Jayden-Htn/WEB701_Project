const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.register
  );

  app.post("/api/auth/login", controller.login);

  app.post("/api/auth/logout", controller.logout);

  app.post(
    "/api/auth/update",
    [authJwt.verifyToken, verifySignUp.checkDuplicateEmailUpdate],
    controller.update
  );
};