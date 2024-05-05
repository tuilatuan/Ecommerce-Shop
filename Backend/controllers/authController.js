const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const prisma = require("../prisma/prisma");
const AuthUtils = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_ACCESS_SECRET_KEY;

exports.register = catchAsync(async (req, res, next) => {
  const data = req.body;
  const authUtils = new AuthUtils(data.email, data.password);

  try {
    let account = await authUtils.getAccountByEmail();
    if (account) {
      res.status(400).json({ message: "Account already exists" });
      return;
    }

    const hashPassword = await authUtils.hashPassword();

    const user = await prisma.user.create({
      data: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
      },
    });
    account = await prisma.account.create({
      data: {
        email: data.email,
        password: hashPassword,
        role: data.role,
        user_id: user.id,
      },
    });

    res.status(200).json({ message: "Register successfully!" });
  } catch (e) {
    next(new AppError(e, 500));
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const data = req.body;
  const authUtils = new AuthUtils(data.email, data.password);

  try {
    const account = await authUtils.getAccountByEmail();
    console.log("account :>> ", account);

    if (!account) {
      res.status(400).json({ message: "Account not exists, please create one!" });
      return;
    }

    // if (!account.is_verified) {
    //   res.status(400).json({ message: "Account is not veried!" });
    //   return;
    // }

    const isPasswordValid = authUtils.comparePassword(account.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Password is not correct!" });
      return;
    }
    const accessToken = authUtils.signAccessToken();
    console.log("accessToken :>> ", accessToken);

    const refreshToken = authUtils.signRefreshToken();
    console.log("refreshToken :>> ", refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(new AppError(error, 500));
    // console.log("error :>> ", error);
  }
});
exports.loginadmin = catchAsync(async (req, res, next) => {
  const data = req.body;
  const authUtils = new AuthUtils(data.email, data.password);

  try {
    const account = await authUtils.getAccountByEmail();
    if (!account) {
      res.status(400).json({ message: "Account not exists, please create one!" });
      return;
    }

    // if (!account.is_verified) {
    //   res.status(400).json({ message: "Account is not veried!" });
    //   return;
    // }

    const isPasswordValid = authUtils.comparePassword(account.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Password is not correct!" });
      return;
    }

    const role = account.role;
    if (role == 0) {
      res.status(600).json({ message: "User is not admin!" });

      return;
    }
    const accessToken = authUtils.signAccessToken();

    const refreshToken = authUtils.signRefreshToken();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(new AppError(error, 500));
    // console.log("error :>> ", error);
  }
});
exports.checkIsLogin = catchAsync(async (req, res, next) => {
  const data = req.body;
  const authUtils = new AuthUtils(data.email, data.password);

  try {
    const account = await authUtils.getAccountByEmail();
    if (!account) {
      res.status(400).json({
        message: "Account not exists, please create one!",
        isLogin: false,
      });
      return;
    }

    const isPasswordValid = authUtils.comparePassword(account.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Password is not correct!", isLogin: false });
      return;
    }

    res.status(200).json({ message: "Login successfully!", isLogin: true });
  } catch (e) {
    next(new AppError(e, 500));
  }
});

exports.refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken;

  // Verify the refresh token
  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the new access token to client
    res.json({ accessToken, refreshToken });
  });
});
