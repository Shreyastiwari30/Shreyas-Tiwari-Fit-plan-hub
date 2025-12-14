const express=require('express');
const router=express.Router();
const {signup,login} = require('../controllers/auth.controller');
const authmiddleware=require('../middleware/auth.middleware');

router.get("/protected", authmiddleware, (req, res) => {
  res.json({
    message: "Protected Route accessed",
    user: req.user
  });
});

router.post("/signup",signup);
router.post("/login",login);

module.exports = router;