
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
        
        const file = await fileQueries.getFileById(parseInt(req.params.fileId))
        console.log(file)
        res.render('file',{file})

    } catch (error) {

        console.log(error)
        res.send('Something went wrong')

    }

}

async function downloadFile(req,res,next){

    console.log(req.params)    

    const file = await fileQueries.getFileById(parseInt(req.params.fileId))
    const filePath = file.url.replace('file_uploader/', '');
    const{ data,error } = await supabase
                                .storage
                                .from('file_uploader')
                                .download(filePath)


    if(error){
        
        res.send('Something went wrong when downloading the file')

    }else{

        const buffer = Buffer.from(await data.arrayBuffer());

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        res.setHeader('Content-Type', data.type);
        res.setHeader('Content-Length', buffer.length);

        // Send the file as a response
        res.send(buffer);
    }

}




module.exports = {
    uploadFile,
    getFileDetail,
    downloadFile,
}