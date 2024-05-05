const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const UserUtils = require("../utils/userUtils");
const AccountUtils = require("../utils/accountUtils");
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const userUtils = new UserUtils();
const accountUtils = new AccountUtils();
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const email = getUserInfoFromAccessToken(token);
  const accountEmail = email;
  if (!accountEmail) {
    res.status(400).json({ message: "Please provide email to find account" });
  }
  const account = await accountUtils.getAccountByEmail(accountEmail);
  if (!account) {
    res.status(400).json({ message: "Account not exists, please create one!" });
  }

  const userId = parseInt(account.user_id);
  if (!userId) {
    res.status(400).json({ message: "Please provide id to get user" });
  }
  const user = await userUtils.getUserById(userId);
  if (!user) {
    res.status(400).json({ message: "User not exists, please create one!" });
  }
  const { email: email_user, id: account_id, user_id: user_id } = account || {};
  const { name, phoneNumber, address } = user || {};

  const data = { account_id, email_user, user_id, name, phoneNumber, address };
  res.status(200).json({ status: "Get user successfully!", data });
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const userId = parseInt(req.body.id);
  if (!userId) {
    res.status(400).json({ message: "Please provide id to get user" });
  }
  const user = await userUtils.getUserById(userId);
  if (!user) {
    res.status(400).json({ message: "User not exists, please create one!" });
  }
  const deleteUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  if (deleteUser) {
    res.status(200).json({ message: "Delete user successfully!" });
  }
});

exports.updateUserById = catchAsync(async (req, res) => {
  const userId = parseInt(req.body.id);
  console.log("req.body :>> ", req.body);
  if (!userId) {
    res.status(400).json({ message: "Please provide id to get user" });
  }
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "Please provide content to update user" });
  }
  const user = await userUtils.getUserById(userId);
  if (!user) {
    res.status(400).json({ message: "User not exists, please create one!" });
  }
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name ?? user.name,
      phoneNumber: data.phoneNumber ?? user.phoneNumber,
      address: data.address ?? user.address,
    },
  });
  if (updateUser) {
    res.status(200).json({ updateUser });
  }
});

exports.findUserByName = catchAsync(async (req, res) => {
  const userName = req.params.name;
  if (!userName) {
    res.status(400).json({ message: "Please provide username to get user" });
  }
  const user = await userUtils.getUserByName(userName);
  if (!user) {
    res.status(400).json({ message: "User not exists, please create one!" });
  }
  res.status(200).json({
    status: "Get user successfully!",
    user,
  });
});

function getUserInfoFromAccessToken(accessToken) {
  try {
    // Xác minh và giải mã accessToken
    const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);

    // Trích xuất thông tin người dùng từ accessToken
    const userInfo = decoded.email; // Ví dụ: lấy email của người dùng từ accessToken

    return userInfo;
  } catch (error) {
    // Xử lý lỗi nếu accessToken không hợp lệ
    console.error("Error decoding access token:", error);
    return null;
  }
}
