const multer = require('multer')
const path = require('path')


const fileQueries = require('../db/fileQueries')





const upload = multer({storage:multer.memoryStorage()})


const uploadFile = [ upload.single('file'),async function (req,res){


   

    console.log(req.file)
    res.send(`file uploaded`)

}]


async function getFileDetail(req,res,next){

    try {
        
        const file = await fileQueries.getFileById(req.params.fileId)
        res.render('file',{file})

    } catch (error) {

        console.log(error)
        res.send('Something went wrong')

    }

}




module.exports = {
    upload,
    uploadFile,
    getFileDetail
}