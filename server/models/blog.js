const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    theme:{
        type:String,
        required:true

    },
    content:{
        type:String,
        default:'N/A'
    },
    time_read:{
        type:String,
        default:'N/A'

    },
    likes:{
        type:String,
        default:'N/A'

    },
    ownerId:{
        type:String,
        required:true

    }
},{timestamps:true})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = {Blog}