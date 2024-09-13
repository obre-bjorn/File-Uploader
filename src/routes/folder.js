const {Router} = require('express')
const folderController = require('../controllers/folderController')
const {isAuthenticated} = require('../config/passport')

const router = Router()


router.post('/add-folder',isAuthenticated, folderController.createFolder)
router.get('/:id', isAuthenticated,folderController.getFolderById)
router.put('/update-folder',isAuthenticated,folderController.updateFolder)
router.delete('/delete-folder', isAuthenticated,folderController.deleteFolder)
router.post('/:folderId/upload-file',isAuthenticated,folderController.createFileToFolder)



module.exports = router