const Session = require('../models/Session')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	getEventById(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				console.log(err)
				res.status(401).json({status: 'error', msg: 'error with the token'})
			} else {
				const { eventId } = req.params
				try {
					const event = await Session.findById(eventId)
					if (event) {
						console.log('🚀 ------------------------------------------------------------------------')
						console.log('🚀 ~ file: DashboardController.js ~ line 34 ~ jwt.verify ~ events', event)
						console.log('🚀 ------------------------------------------------------------------------')
						return res.json({ authData: authData, events: event })
					} else {
						return res.json({ message: 'EventId does not exist!' })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}

		})
	},
	getAllEvents(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				console.log(err)
				res.status(401).json({status: 'error', msg: 'error with the token'})
			} else {
				const { sport } = req.params
				const query = sport ? { sport } : {}

				try {
					let events = await Session.find(query).lean()
					const user = await User.findById(authData.user._id)
					if (!user) { return res.status(400).json({ message: 'User does not exist!' }) }

					if (events) {
						events = events.map(event => {
							event.isFavorite = false
							if (user.savedWorkouts.includes(event._id)) event.isFavorite = true
							return event
						})
						return res.json({ authData, events })
					} else {
						return res.json({ message: 'We do have any events yet' })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}

			}
		})
	},

	getEventsByUserId(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {

				const { user_id } = req.headers
				const user = await User.findById(authData.user._id)
				if (!user) { return res.status(400).json({ message: 'User does not exist!' }) }

				try {
					const events = await Session.find({ '_id': {'$in': user.savedWorkouts } })

					if (events) {
						return res.json({ authData, events })
					} else {
						return res.status(400).json({ message: `We do have any events with the user_id ${user_id}` })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})
	}
}