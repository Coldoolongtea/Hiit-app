const Event = require('../models/Session')
const User = require('../models/User')
const jwt = require('jsonwebtoken')




module.exports = {
	// reverting upload to S3
	// createEvent(req, res) {
	// 	jwt.verify(req.token, 'secret', async (err, authData) => {
	// 		if (err) {
	// 			res.statusCode(401)
	// 		} else {
	// 			const { title, description, price, sport, date } = req.body
	// 			const { location } = req.file

	// 			const user = await User.findById(authData.user._id)

	// 			if (!user) {
	// 				return res.status(400).json({ message: 'User does not exist!' })
	// 			}

	// 			try {
	// 				const event = await Event.create({
	// 					title,
	// 					description,
	// 					sport,
	// 					price: parseFloat(price),
	// 					user: authData.user._id,
	// 					thumbnail: location,
	// 					date
	// 				})

	// 				return res.json(event)
	// 			} catch (error) {
	// 				return res.status(400).json({ message: error })
	// 			}
	// 		}
	// 	})

	// },
	async createEvent(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { title , nbrMoves, description, mouvements} = req.body
				try {
					const user = await User.findById(authData.user._id)
					if (!user) {
						return res.status(400).json({ message: 'User does not exist!' })
					}

					const event = await Event.create({
						title,
						nbrMoves: parseInt(nbrMoves),
						mouvements,						
						description,
						user: authData.user._id
					})
					console.log('🚀 ------------------------------------------------------------------')
					console.log('🚀 ~ file: EventController.js ~ line 67 ~ jwt.verify ~ event', event)
					console.log('🚀 ------------------------------------------------------------------')

					console.log(user, event)
					user.savedWorkouts.push(event.id)
					await user.save()

					return res.json(event)
				} catch (error) {
					console.log(error)
					return res.status(400).json({ message: error })
				}
			}
		})
	},

	delete(req, res) {
		jwt.verify(req.token, 'secret', async (err) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { eventId } = req.params
				try {
					await Event.findByIdAndDelete(eventId)
					return res.status(204).send()

				} catch (error) {
					return res.status(400).json({ message: 'We do have any event with the ID' })
				}
			}
		})
	},

	async addToFavorite(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				try {
					const event = req.body.event
					const user = await User.findById(authData.user._id)
					if (!user) return res.status(400).json({ message: 'User does not exist!' })

					console.log(user.savedWorkouts, event)
					const index = user.savedWorkouts.findIndex(wks => wks === event._id)
					console.log(index)
					if (index >= 0) { user.savedWorkouts.splice(index, 1); await user.save() }
					else { user.savedWorkouts.push(event._id); await user.save() }
					return res.json({status: 'success'})
				} catch (error) {
					console.log(error)
					return res.status(400).json({ message: error })
				}
			}
		})
	}
}