const {prisma} = require('./queries')


async function createFolder(name,userId){

    const folder = await prisma.folder.create({
        data: {
            name: name,
            userId: userId
        }
    })

    // To remove for testing 
    console.log(folder)

}



async function getAllFolders(){

    const folders = await prisma.folder.findMany()

    return folders

}


async function getFolder(folderId){

    const folder = await prisma.folder.findUnique({
        where: {
            id : folderId
        },
        include:{
            files: true
        }
    })

    return folder

}

async function updateFolder(folderId,folderName) {

    const folder = await prisma.folder.update({
        where : {
            id : folderId
        },
        data: {
            name : folderName
        }
    })
    
}


async function deleteFolder(folderId){

    // Recursively or Cascade delete files in the Folder
    const deletedFilesInFolders = await prisma.file.deleteMany({
        where : {
            folderId : folderId
        }
    })

    const folder = await prisma.folder.delete({
        where:{
            id : folderId
        }
    })

}

module.exports = {
    createFolder,
    getAllFolders,
    getFolder,
    updateFolder,
    deleteFolder
}   