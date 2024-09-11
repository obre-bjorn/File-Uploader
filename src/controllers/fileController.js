const multer = require('multer')
const path = require('path')
const fileQueries = require('../db/fileQueries')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..','..', 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage})


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