
const path = require('path')

//Imported from folder controller
const {upload, supabase} = require('../config/storage')


const fileQueries = require('../db/fileQueries')



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

async function downloadFile(req,res,next){


    const file = await fileQueries.getFileById(req.params.id)

    const{ data,error } = await supabase
                                .storage
                                .from('file_uploader')
                                .download(file.url)


    if(error){
        res.send('Something went wrong when downloading the file')
    }else{


        res.redirect(`/folder/${file.folder.id}`)
    }





}




module.exports = {
    uploadFile,
    getFileDetail,
    downloadFile,
}