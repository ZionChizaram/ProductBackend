const express = require("express");
const {registerUser, loginUser,   updateUser}= require("../controller/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser   );
router.put("/:id",   updateUser  )


module.exports = router
