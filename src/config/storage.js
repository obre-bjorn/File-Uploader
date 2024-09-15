
const multer = require('multer')

require('dotenv').config()


const {createClient} = require('@supabase/supabase-js')

const upload = multer({storage:multer.memoryStorage()})




const supabase = createClient(process.env.PROJECT_URL,process.env.SECRET_KEY)



module.exports = {
    upload,
    supabase
}