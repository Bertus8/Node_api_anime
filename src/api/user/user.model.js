const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')

const userSchema = new mongoose.Schema({
    name: { type: 'String', trim: true, required: true },
    email: { type: 'String', trim: true, required: true, unique: true },
    password: { type: 'String', trim: true, required: true }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, `The password you created doesn't meet account requirements`))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User