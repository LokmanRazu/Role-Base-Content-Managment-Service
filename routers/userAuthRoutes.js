const router = require('express').Router();

const { userLogIn,forgetPassword } = require('../controllers/UserAuthController');

router.post('/',userLogIn)
router.post('/forget',forgetPassword)

module.exports = router