const AnimeRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewAnime, getAnime, deleteAnime, patchAnime, getAllAnimes, addCharacterToAnime } = require('./anime.controller')
const upload = require('../../utils/middleware/file')

AnimeRoutes.post('/',[isAuth], postNewAnime)
AnimeRoutes.get('/:id', getAnime)
AnimeRoutes.get('/', getAllAnimes)
AnimeRoutes.delete('/:id',[isAuth], deleteAnime)
AnimeRoutes.patch('/:id',[isAuth], patchAnime)
AnimeRoutes.patch('/addCharacterToAnime/:id',[isAuth], addCharacterToAnime)

module.exports = AnimeRoutes;