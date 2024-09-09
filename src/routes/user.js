const {Router} = require('express')
const userController = require('../controllers/userController')


const router = Router()


router.get('/sign-up',userController.getCreateUser)
router.post('/sign-up', userController.createUser)

router.post('/log-in', userController.logInUser)
router.get('/log-out', userController.logOutUser)


module.exports = router