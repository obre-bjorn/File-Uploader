const express = require('express')
const session = require('express-session')
const {PrismaSessionStore} = require("@quixo3/prisma-session-store")
const {prisma}  = require("./db/queries")


const initializePassport = require('./config/passport')

//Routes
const userRouter = require('./routes/user')
const fileRouter = require('./routes/file')
const folderRouter = require('./routes/folder')

const folderQueries = require('./db/folderQueries')


const app = express()


app.set("view engine", "ejs")

app.use(express.urlencoded({extended:false}))





app.use(
    session({
        cookie:{
            maxAge : 7 * 24 * 60 * 1000
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined
            }
        )
    })
)

initializePassport(app)

app.get('/', async (req,res,next) =>{

    const folders =  await folderQueries.getAllFolders()
    console.log(folders)
    res.render('index',{user: req.user, folders : folders})


})

app.use('/',userRouter)

app.use('/',fileRouter)

app.use('/folder', folderRouter)


app.listen(3000, () =>{
    console.log("Server running on port 3000")
})