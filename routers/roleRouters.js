const router = require('express').Router();

const  { getSingleRole,getAllRole,createRole,deleteRole } = require('../controllers/roleController')

router.get('/:id',getSingleRole);
router.get('/',getAllRole);
router.post('/',createRole);
router.delete('/:id',deleteRole);

module.exports = router