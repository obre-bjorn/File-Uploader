const queries = require('../db/folderQueries')
const {createFile} = require('../db/fileQueries')
const { upload } = require('./fileController')


async function createFolder(req,res,next){
 
    try {
        
        const folder = await queries.createFolder(req.body.name,req.user.id)

        res.redirect('/')

    } catch (error) {
        console.log(error)
    }

}


async function getAllFolders(req,res,next){

    try {

        const folders = await queries.getAllFolders()
        
        
    } catch (error) {
        console.log(error)
    }

}


const createFileToFolder = [ upload.single('file'), async (req,res,next) => {

    try {
        console.log(req.file)
        // const file = await createFile(req.file.path, req.user.id,req.params.folderId)

        res.redirect(`/folder/${req.params.folderId}`)

        
    } catch (error) {
        console.log(error)
        res.send('Something went wrong')
    }


}]


async function getFolderById(req,res,next){

    try {

        const folder = await queries.getFolder(parseInt(req.params.id))
        
        res.render('folder', {folder})


    } catch (error) {

        console.log(error)

    }


}


async function updateFolder(req,res,next){

    try {
        
        await queries.updateFolder(req.params.id, req.body.name)

        res.redirect(`/folder/${req.params.id}`)

    } catch (error) {
        console.log(error);
        
    }

}




async function deleteFolder(req,res,next) {

    try {
        
        await queries.deleteFolder(req.params.id)

        res.redirect('/')


    } catch (error) {
        console.log(error);
        
    }
    
}



module.exports = {
    createFolder,
    getFolderById,
    updateFolder,
    deleteFolder,
    createFileToFolder
}