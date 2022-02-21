const UserRoutes = require('express').Router();
const { isAuth } = require('../../utils/middleware/auth')
const { postNewUser, loginUser, logOut, getUser } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout',[isAuth], logOut)
UserRoutes.get('/:id', [isAuth], getUser)

module.exports = UserRoutes;