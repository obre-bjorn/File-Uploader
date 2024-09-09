const passport = require('passport')
const LocalStategy = require('passport-local')
const bcrypt = require('bcryptjs')


const queries = require ('../db/queries')

function initializePassport(app){
    
    app.use(passport.session())


    passport.use(
        new LocalStategy( async (username, password,done) =>{
            
            try{
                
                const user = await queries.getUserByUsername(username = username)


                if(!user){
                    return done(null, false, {message : "Incorrect username"})
                }

                const match = await bcrypt.compare(password,user.password)

                if(!match){
                    return done(null, false, {message : "Incorrect password"})
                }     
                
                
                return done(null,user)

            }catch(err){
                return done(err)
            }

        })
    )

    passport.serializeUser((user,done) =>{
        done(null,user.id)
    })


    passport.deserializeUser(async (id,done)=>{

        try{

            const user = await queries.getUsernameById(id = id)
    
            done(null, user)

        }catch(err){
            done(err)
        }


    })
}



module.exports =  initializePassport