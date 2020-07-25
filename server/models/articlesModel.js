const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'An Article must have a title']
    },
    article:{
        type:String,
        required:[true,'An Article must have a articles']
    },
    author:{
        type:String,
        required:[true,'An Article must have a author']
    }
})

const Articles = mongoose.model('Articles',articlesSchema)
module.exports = Articles