const {Router} = require('express')

const fileController = require('../controllers/fileController')

const router = Router()




router.post('/upload-file',fileController.uploadFile)
router.get('folder/:folderId/:fileId',fileController.getFileDetail)


module.exports = router