const {Router} = require('express')
const userController = require('../controllers/userController')


const router = Router()


router.get('/sign-up',userController.getCreateUser)
router.post('/sign-up', userController.createUser)


module.exports = router