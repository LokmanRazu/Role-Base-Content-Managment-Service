const router = require('express').Router();
const {authentication,isAdmin } = require('../middlewares/userAuthentication')
const { getSingleUser,getAllUser,cerateUser,updateUser,deleteUser } = require('../controllers/UserController');
const { Permission } = require('../utils/permission');

router.get('/:id',authentication,isAdmin([Permission.MODERATOR]),getSingleUser)
router.get('/',getAllUser)
router.post('/',cerateUser)
router.patch('/',updateUser)
router.delete('/:id',deleteUser)

module.exports = router