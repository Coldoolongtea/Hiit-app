const mongoose = require('mongoose')


const MovesSchema = new mongoose.Schema({  
    
    Mouvement_name: String,
    Duration: Number,
    Rest_Duration: Number });

const SessionSchema = new mongoose.Schema({
	Workout_name: String,
	Number_of_moves: Number,
	mouvements : [MovesSchema],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	toJSON: {
		virtuals: true
	}
})

// EventSchema.virtual('thumbnail_url').get(function () { return `http://localhost:8080/files/${this.thumbnail}` })

module.exports = mongoose.model('Session', SessionSchema)
