
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const apiController=require("../controllers/apiController")


router.post('/', apiController.createUser);
router.post('/verify-email', apiController.verifyEmail);

module.exports = router;