const {body, validationResult}= require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const queries = require('../db/queries')

const validateSignUpData = [
   
    body('username')
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isAlpha()
        .withMessage("Name must only use alphabet letters"),
    body('email')
        .trim()
        .isEmail()
        .withMessage(`Must be a valid Email`),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body('confPassword')
        .trim()
        .notEmpty()
        .withMessage("Confirm password cannot be empty")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    
]


const getCreateUser = (req,res,next) =>{

    res.render('signup')

}

const createUser = [ validateSignUpData, async (req,res,next) =>{

    const errors = validationResult(req)


    if(!errors.isEmpty()){

        return res.status(400).render('signup', {errors : errors.array()})
    
    }

    try {
        
        req.body.password =  await bcrypt.hash(req.body.password, 10)


        
        await queries.createUser(req.body)

        res.redirect('/')
    

    } catch (error) {
        
        console.log(error)
    }
    

}]


const logInUser = passport.authenticate("local",{
    successRedirect: '/',
    failureRedirect: '/'
})


const logOutUser = (req,res,next) =>{
    req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
    getCreateUser,
    createUser,
    logInUser,
    logOutUser
}