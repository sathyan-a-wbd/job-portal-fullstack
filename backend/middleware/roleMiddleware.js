const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user.userType !== roles) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = authorizeRoles;
