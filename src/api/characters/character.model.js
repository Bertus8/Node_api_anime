const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
    name: { type: 'String', trim: true, required: true },
    anime: { type: 'String', required: true },
    powers: { type: 'String', trim: true, required: true }, 
    img: { type: 'String', trim: true },
}, { timestamps: true })

const Character = mongoose.model('characters', characterSchema)
module.exports = Character