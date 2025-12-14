const express=require('express');
const router= express.Router();

const authmiddleware=require('../middleware/auth.middleware');
const rolemiddleware=require('../middleware/role.middleware');

const {createplan,getplan,updateplan,deleteplan} = require('../controllers/plan.controller');

router.get("/", getplan);
router.post("/", authmiddleware, rolemiddleware("trainer"), createplan);
router.put("/:id", authmiddleware, rolemiddleware("trainer"), updateplan);
router.delete("/:id", authmiddleware, rolemiddleware("trainer"), deleteplan);






module.exports = router;

