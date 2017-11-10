const Router = require("express").Router;
const router = new Router();

const example = require("./model/example/router");

const companyRepresentative = require("./model/CompanyRepresentative/router");


router.route("/").get((req, res) => {
  res.json({ message: "Welcome to backend API!" });
});

router.use("/CompanyRepresentative", companyRepresentative);


module.exports = router;
