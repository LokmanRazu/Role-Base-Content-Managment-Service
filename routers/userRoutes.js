const router = require('express').Router();
const { getSingleUser,getAllUser,cerateUser,updateUser,deleteUser } = require('../controllers/UserController')

router.get('/:id',getSingleUser)
router.get('/',getAllUser)
router.post('/',cerateUser)
router.patch('/',updateUser)
router.delete('/:id',deleteUser)

module.exports = router