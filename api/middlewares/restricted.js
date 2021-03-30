const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.cookies.token || req.headers.authorization;

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
