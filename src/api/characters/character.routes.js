const CharacterRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewCharacter, getCharacter, deleteCharacter, patchCharacter, getAllCharacters } = require('./character.controller')
const upload = require('../../utils/middleware/file')

CharacterRoutes.post('/',[isAuth], upload.single('img'), postNewCharacter)
CharacterRoutes.get('/:id', getCharacter)
CharacterRoutes.get('/', getAllCharacters)
CharacterRoutes.delete('/:id',[isAuth], deleteCharacter)
CharacterRoutes.patch('/:id',[isAuth], upload.single('img'), patchCharacter)

module.exports = CharacterRoutes;