const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	email: String,
	savedWorkouts: Array
})

module.exports = mongoose.model('User', UserSchema)
