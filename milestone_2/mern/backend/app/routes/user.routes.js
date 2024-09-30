const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/page/all", controller.allAccess);

  app.get("/api/page/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/page/staff",
    [authJwt.verifyToken, authJwt.isStaff], controller.staffBoard
  );

  app.get(
    "/api/page/admin",
    [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard
  );
};