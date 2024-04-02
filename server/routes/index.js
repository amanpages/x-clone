const router = require("express").Router();
//just to test server
router.get("/", (req, res) => {
  res.send("Hello");
});

// user related routes
router.use("/user", require("./user"));
// post related routes
router.use("/post", require("./post"));

module.exports = router;
