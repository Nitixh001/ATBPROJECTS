const express = require("express");
const router = express.Router();
const {addUser} = require("../controllers/userController");
//add user
router.post("/add",addUser);


module.exports = router;