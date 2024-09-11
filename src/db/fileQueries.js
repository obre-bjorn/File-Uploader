const {prisma} = require('./queries')


async function createFile(url,userId,folderId) {


    try {

        const file = await prisma.file.create({
            data:{
                url : url,
                userId: userId,
                folderId: folderId
            }
        })
        
    } catch (error) {
        console.log(errors);
        
    }
    
}

async function getFileById(fileId){

    try {
        
        const file = await prisma.file.findUnique({
            where: {
                id : fileId
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