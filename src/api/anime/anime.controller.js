const Anime = require('./anime.model');
const { deleteFile } = require('../../utils/middleware/deleteFile')
const { setError } = require('../../utils/errors/error');

const postNewAnime = async (req, res, next) => {
    try {
        const newAnime = new Anime(req.body)
        if (req.file) {
            newAnime.img = req.file.path
        }
        const animeDB  = await newAnime.save()
        return res.status(201).json(animeDB)
    } catch (error) {
        return next(setError(500, 'Anime not save'))        
    }
}

const getAllAnimes = async (req,res,next) => {
try {
    const animeDB = await Anime.find().populate('characters')
    res.status(200).json(animeDB)
} catch (error) {
    console.log(error)
    return next(setError(500, 'Animes server errors'))
}
}

const getAnime = async (req,res,next) => {
    try {
        const { id } = req.params;
        const animeDB = await Anime.findById(id).populate('characters')
        if (!animeDB){
            return next(setError(404, 'Anime not found'))
        }
        return res.status(200).json(animeDB)
    } catch (error) {
        return next(setError(500, 'Anime fail'))
    }
}

const deleteAnime = async (req,res,next) => {
    try {
        const { id } = req.params;
        const animeDB = await Anime.findByIdAndDelete(id)
        if (!animeDB){
            return next(setError(404, 'Anime not found'))
        }
        if (animeDB.img) {
            deleteFile(animeDB.img)
        }
        return res.status(200).json(animeDB)
    } catch (error) {
        return next(setError(500, 'Anime fail'))
    }
}

const patchAnime = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchAnime = new Anime(req.body);
        patchAnime._id = id
        if (req.file) {
            patchAnime.img = req.file.path
        }
        const animeDB = await Anime.findByIdAndUpdate(id, patchAnime);
        if (!animeDB){
            return next(setError(404, 'Anime not found'))
        }
        if (animeDB.img) {
            deleteFile(animeDB.img)
        }
        return res.status(200).json({new: patchAnime, old: animeDB})
    } catch (error) {
        return next(setError(500, 'Anime fail'))
        
    }
}

const addCharacterToAnime = async (req,res,next) => {
    try {
        const animeDB = await Anime.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                Characters: req.body.Characters
            } 
        })
        if(!animeDB){
            return next(setError(404, 'Anime not found'))
        }
        return res.status(200).json(animeDB)        
    } catch (error) {
        return next(setError(500, 'Anime fail'))
    }
}


module.exports = {
    postNewAnime,
    getAnime,
    deleteAnime,
    patchAnime,
    getAllAnimes,
    addCharacterToAnime,
}