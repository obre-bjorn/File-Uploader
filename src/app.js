const express = require('express')
const session = require('express-session')
const {PrismaSessionStore} = require("@quixo3/prisma-session-store")
const {prisma}  = require("./db/queries")

const userRouter = require('./routes/user')

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

app.get('/', (req,res,next) =>{
    res.render('index',{user: req.user})

})

app.use('/',userRouter)


app.listen(3000, () =>{
    console.log("Server running on port 3000")
})