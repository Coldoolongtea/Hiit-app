function verifyToken(req, res, next) {
	const bearerToken = req.header('user')
	if (typeof bearerToken !== 'undefined') {
		req.token = bearerToken
		next()
	} else {
		res.status(401).json({status: 'error', msg: 'no token provided'})
	}
}

module.exports = verifyToken