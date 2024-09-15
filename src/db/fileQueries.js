const {prisma} = require('./queries')

async function createFile(name,url,userId,folderId,fileSize) {


    try {

        const file = await prisma.file.create({
            data:{
                name: name,
                url : url,
                userId: userId,
                folderId: folderId,
                size: fileSize
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}

async function getFileById(fileId){

    try {
        
        const file = await prisma.file.findUnique({
            where: {
                id : fileId
            },
            include:{
                folder: true
            }
        })


        return file

    } catch (error) {
        
        console.log(error);
        

    }


}




module.exports = {
    createFile,
    getFileById
}