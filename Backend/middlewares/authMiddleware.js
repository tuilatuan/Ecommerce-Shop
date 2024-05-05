const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AuthUtils = require("../utils/authUtils");
const AppError = require("../utils/appError");

// protected route
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not log in! Please log in to get access!", 401)
    );
  }

  // 2) Verification token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return next(new AppError("Forbidden", 403));
    }

    // 3) Check user still exists with decoded token
    const currentUser = await new AuthUtils().getUserByEmail(decoded.email);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token does no longer exist.", 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });
});
