const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { subscribePlan, getMySubscriptions } = require("../controllers/subscription.controller");

router.post("/subscribe", authMiddleware, subscribePlan);
router.get("/my", authMiddleware, getMySubscriptions);

module.exports = router;
