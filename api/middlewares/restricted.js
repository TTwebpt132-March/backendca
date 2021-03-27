const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		console.log(req.cookies);
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({
				message: 'Token required.'
			});
		}

		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message: 'Token invalid.'
				});
			}
			req.token = decoded;

			next();
		});
	} catch (err) {
		next(err);
	}
};
