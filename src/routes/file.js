const {Router} = require('express')

const fileController = require('../controllers/fileController')
const {isAuthenticated} = require('../config/passport')

const router = Router()




router.post('/upload-file',isAuthenticated,fileController.uploadFile)
router.get('folder/:folderId/:fileId',isAuthenticated,fileController.getFileDetail)


module.exports = router