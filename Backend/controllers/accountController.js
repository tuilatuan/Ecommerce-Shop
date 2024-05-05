const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const AccountUtils = require("../utils/accountUtils");
const AuthUtils = require("../utils/authUtils");
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const accountUtils = new AccountUtils();

exports.getAllAccounts = catchAsync(async (req, res) => {
  const accounts = await prisma.account.findMany();
  res.status(200).json({
    status: "success",
    results: accounts.length,
    data: {
      accounts,
    },
  });
});

exports.getAccountById = catchAsync(async (req, res) => {
  const accountId = parseInt(req.params.id);
  if (!accountId) {
    res.status(400).json({ message: "Please provide id to get account 1" });
  }
  const account = await accountUtils.getAccountById(accountId);
  if (!account) {
    res.status(400).json({ message: "Account not exists, please create one!" });
  }
  res.status(200).json({ status: "Get account successfully!", account });
});

exports.deleteAccountById = catchAsync(async (req, res) => {
  const accountId = parseInt(req.params.id);
  if (!accountId) {
    res.status(400).json({ message: "Please provide id to get account" });
  }
  const account = await accountUtils.getAccountById(accountId);
  if (!account) {
    res.status(400).json({ message: "Account not exists, please create one!" });
  }
  const deleteAccount = await prisma.account.delete({
    where: {
      id: accountId,
    },
  });
  if (deleteAccount) {
    res.status(200).json({ message: "Delete account successfully!" });
  }
});

exports.updateAccountById = catchAsync(async (req, res) => {
  const accountId = parseInt(req.body.id);
  let newPass = req.body.password;

  if (!accountId) {
    res.status(400).json({ message: "Please provide id to get account" });
  }
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "Please provide content to update account" });
  }

  const account = await accountUtils.getAccountById(accountId);
  if (!account) {
    res.status(400).json({ message: "Account not exists, please create one!" });
  }

  if (newPass.trim() !== "") {
    const authUtils = new AuthUtils(data.email, data.password);
    const hashPassword = await authUtils.hashPassword();
    newPass = hashPassword;
    console.log("Chuỗi không rỗng");
  } else {
    newPass = account.password;
  }

  const updateAccount = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      email: data.email ?? account.email,
      role: data.role ?? account.role,
      password: newPass,
    },
  });
  if (updateAccount) {
    res.status(200).json({ status: "Update account successfully!", updateAccount });
  }
});

exports.findAccountByEmail = catchAsync(async (req, res) => {
  // const accountEmail = req.params.email;
  // if (!accountEmail) {
  //   res.status(400).json({ message: "Please provide email to find account" });
  // }
  // const account = await accountUtils.getAccountByEmail(accountEmail);
  // if (!account) {
  //   res.status(400).json({ message: "Account not exists, please create one!" });
  // }
  // res.status(200).json({
  //   status: "Get account successfully!",
  //   account,
  // });
  return;
});

exports.findAccountByMe = catchAsync(async (req, res) => {
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
  res.status(200).json({
    status: "Get account successfully!",
    account,
  });
  return account;
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
