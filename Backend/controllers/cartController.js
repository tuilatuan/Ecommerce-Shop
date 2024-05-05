const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const CartUtils = require("../utils/cartUtils");
const AccountUtils = require("../utils/accountUtils");

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

const cartUtils = new CartUtils();
const accountUtils = new AccountUtils();

exports.findAll = catchAsync(async (req, res) => {
  const carts = await prisma.cart.findMany({
    include: {
      Product: true,
    },
  });
  const total = carts.reduce((accumulator, currentItem) => {
    // Tính tổng tiền cho mỗi mặt hàng và cộng vào tổng
    return accumulator + currentItem.subTotal;
  }, 0);

  res.status(200).json({
    status: "success",
    length: carts.length,
    carts,
    total: total,
  });
});

exports.findById = catchAsync(async (req, res) => {
  const query = req.query;

  if (!query.id) {
    return res.status(400).json({
      status: "No id provided",
    });
  }

  var cart = await cartUtils.getById(parseInt(query.id));

  if (!cart) {
    return res.status(400).json({
      status: "No cart found",
    });
  } else {
    return res.status(200).json({
      status: "Cart search successful",
      cart,
    });
  }
});

exports.findByUserId = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const email = getUserInfoFromAccessToken(token);
  console.log("token get cart", token);
  if (!email) {
    return res.status(400).json({ message: "Please provide email to find account" });
  }
  const account = await accountUtils.getAccountByEmail(email);
  if (!account) {
    return res
      .status(400)
      .json({ message: "Account not exists, please create one!" });
  }

  var carts = await cartUtils.getByUserID(parseInt(account.user_id));
  const total = carts.reduce((accumulator, currentItem) => {
    // Tính tổng tiền cho mỗi mặt hàng và cộng vào tổng
    return accumulator + currentItem.subTotal;
  }, 0);

  if (!carts) {
    return res.status(400).json({
      status: "No cart found",
    });
  } else {
    return res.status(200).json({
      status: "Cart search successful",
      carts,
      length: carts.length,
      total: total,
    });
  }
});

exports.create = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ message: "No content provided" });
  }
  const cart = await prisma.cart.create({
    data: data,
  });
  if (cart) {
    return res.status(200).json({ status: "Create cart successfully!", cart });
  }
});

exports.deleteById = catchAsync(async (req, res) => {
  const id = parseInt(req.params.itemId);
  if (!id) {
    res.status(400).json({ message: "No id provided" });
  }
  const cart = await cartUtils.getById(id);
  if (!cart) {
    res.status(400).json({ message: "No cart found" });
  }
  const cartDelete = await prisma.cart.delete({
    where: {
      id: id,
    },
  });
  if (cartDelete) {
    res.status(200).json({ message: "Delete cart successfully!" });
  }
});

exports.deleteAllByUserID = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const email = getUserInfoFromAccessToken(token);
  if (!email) {
    return res.status(400).json({ message: "Please provide email to find account" });
  }
  const account = await accountUtils.getAccountByEmail(email);
  if (!account) {
    return res
      .status(400)
      .json({ message: "Account not exists, please create one!" });
  }

  const carts = await cartUtils.getByUserID(parseInt(account.user_id));
  if (!carts) {
    return res.status(400).json({ message: "No cart found" });
  }
  const cartDelete = await prisma.cart.deleteMany({
    where: {
      id_user: account.user_id,
    },
  });
  if (cartDelete) {
    return res.status(200).json({ message: "Delete cart successfully!" });
  }
});

exports.updateById = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const cart = await cartUtils.getById(parseInt(data.id));
  if (!cart) {
    res.status(400).json({ message: "No cart found" });
  }
  const updateCart = await prisma.cart.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      color: data.color ?? cart.color,
      id_product: data.id_product ?? cart.id_product,
      id_user: data.id_user ?? cart.id_user,
      quantity: data.quantity ?? cart.quantity,
      subTotal: data.subTotal ?? cart.subTotal,
    },
  });
  if (updateCart) {
    res.status(200).json({ status: "Update cart successfully!", updateCart });
  }
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
