const router = require('express').Router();
const { getSingleUser,getAllUser,cerateUser } = require('../controllers/UserController')

router.get('/:id',getSingleUser)
router.get('/',getAllUser)
router.post('/',cerateUser)

module.exports = router