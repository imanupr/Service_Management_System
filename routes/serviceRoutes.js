const express = require("express");
const { createService } = require("../controllers/serviceController");
const {protect,authorize}= require("../middleware/authMiddleware")
const router = express.Router();


router.post("/add",protect,authorize("provider"),createService)
module.exports = router;