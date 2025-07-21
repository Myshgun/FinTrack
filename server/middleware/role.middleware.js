module.exports = function (roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.roleId)) {
			return res.status(403).json({ message: "Доступ запрещен" });
		}

		next();
	};
};
