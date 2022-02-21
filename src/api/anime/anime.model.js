const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animeSchema = new Schema({
    name: { type: 'String', trim: true, required: true },    
    year: { type: 'Number', trim: true},
    genre:  { type: 'String', trim: true, required: true },
    characters:  [{ type: Schema.Types.ObjectId, trim: true, ref: "characters"}],
},
 { timestamps: true }
)

const Anime = mongoose.model('anime', animeSchema)
module.exports = Anime