const Character = require('./character.model');
const { deleteFile } = require('../../utils/middleware/deleteFile')
const { setError } = require('../../utils/errors/error');

const postNewCharacter = async (req, res, next) => {
    try {
        const newCharacter = new Character(req.body)
        if (req.file) {
            newCharacter.img = req.file.path
        }
        const characterDB  = await newCharacter.save()
        return res.status(201).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character not save'))        
    }
}

const getAllCharacters = async (req,res,next) => {
try {
    const characterDB = await Character.find()
    res.status(200).json(characterDB)
} catch (error) {
    console.log(error)
    return next(setError(500, 'Characters server errors'))
}
}

const getCharacter = async (req,res,next) => {
    try {
        const { id } = req.params;
        const characterDB = await Character.findById(id)
        if (!characterDB){
            return next(setError(404, 'Character not found'))
        }
        return res.status(200).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character fail'))
    }
}

const deleteCharacter = async (req,res,next) => {
    try {
        const { id } = req.params;
        const characterDB = await Character.findByIdAndDelete(id)
        if (!characterDB){
            return next(setError(404, 'Character not found'))
        }
        if (characterDB.img) {
            deleteFile(characterDB.img)
        }
        return res.status(200).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character fail'))
    }
}

const patchCharacter = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchCharacter = new Character(req.body);
        patchCharacter._id = id
        if (req.file) {
            patchCharacter.img = req.file.path
        }
        const characterDB = await Character.findByIdAndUpdate(id, patchCharacter);
        if (!characterDB){
            return next(setError(404, 'Character not found'))
        }
        if (characterDB.img) {
            deleteFile(characterDB.img)
        }
        return res.status(200).json({new: patchCharacter, old: characterDB})
    } catch (error) {
        return next(setError(500, 'Character fail'))
        
    }
}

module.exports = {
    postNewCharacter,
    getCharacter,
    deleteCharacter,
    patchCharacter,
    getAllCharacters
}