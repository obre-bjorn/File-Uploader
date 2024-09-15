const {Router} = require('express')

const fileController = require('../controllers/fileController')
const {isAuthenticated} = require('../config/passport')

const router = Router()




router.get('/folder/:folderId/file/:fileId',isAuthenticated,fileController.getFileDetail)
router.post('/upload-file',isAuthenticated,fileController.uploadFile)
router.get('/download/:fileId',isAuthenticated,fileController.downloadFile)

module.exports = router