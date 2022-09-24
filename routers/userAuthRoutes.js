const router = require('express').Router();

const { userLogIn,forgetPassword,resetPassword } = require('../controllers/UserAuthController');

router.post('/',userLogIn)
router.post('/forget',forgetPassword)
router.post('/resetPassword', resetPassword)

module.exports = router