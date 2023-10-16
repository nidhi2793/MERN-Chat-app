const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getAllUser,
} = require("../Controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(registerUser).get(protect, getAllUser);
router.route("/login").post(authUser);

module.exports = router;
