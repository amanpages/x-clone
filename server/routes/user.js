// creating user router
const router = require("express").Router();

// controller
const userController = require("../controllers/userController");

const { isLoggedIn } = require("../middlewares/user");

// signup route
router.post("/signup", userController.signup);

// signin route
router.post("/signin", userController.login);

router.use(isLoggedIn);

router.get("/loggedInUser", userController.loggedInUser);
// signout
router.get("/signout", userController.logout);
// all user
router.get("/alluser", userController.getAllUser);
// user's follows
router.get("/myfollows", userController.myFollows);
// user's followers
router.get("/myfollower", userController.myFollowers);
// update data
router.put("/updateinfo", userController.updateInfo);
// update password
router.put("/updatepassword", userController.updatePassword);
// delete account
router.put("/deleteaccount", userController.deleteAccount);
// follow and unfollow
router.put("/togglefollow", userController.toggleFollow);

// export router
module.exports = router;
