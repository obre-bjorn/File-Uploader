const {PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()



async function getUserByUsername(email){

    const user = await prisma.user.findUnique({
        where : {email}
    })

    return user
}

async function getUsernameById(id) {
    const user = await prisma.user.findUnique({
        where: {id}
    })

    return user
}


async function createUser({username,email,password}){
    const user = await prisma.user.create(
        {
            data : {
                username: username,
                email : email,
                password : password
            }
        }
    )

    console.log(user)
}




module.exports = {
    prisma,
    getUserByUsername,
    getUsernameById,
    createUser
}