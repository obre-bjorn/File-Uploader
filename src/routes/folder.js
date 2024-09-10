const {Router} = require('express')
const folderController = require('../controllers/folderController')

const router = Router()


router.post('/add-folder', folderController.createFolder)
router.get('/:id', folderController.getFolderById)
router.put('/update-folder',folderController.updateFolder)
router.delete('/delete-folder', folderController.deleteFolder)



module.exports = router