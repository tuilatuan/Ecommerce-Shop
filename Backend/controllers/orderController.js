const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const OrderUtils = require("../utils/orderUtils");
const AccountUtils = require("../utils/accountUtils");
const CartUtils = require("../utils/cartUtils");
const accountUtils = new AccountUtils();
const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

const orderUtils = new OrderUtils();
const cartUtils = new CartUtils();

exports.findAll = catchAsync(async (req, res) => {
  const orders = await prisma.order.findMany();
  res.status(200).json({
    status: "success",
    length: orders.length,
    data: {
      orders,
    },
  });
});

exports.findById = catchAsync(async (req, res) => {
  const query = req.query;

  if (!query.id) {
    return res.status(400).json({
      status: "No id provided",
    });
  }

  var order = await orderUtils.getById(parseInt(query.id));

  if (!order) {
    return res.status(400).json({
      status: "No order found",
    });
  } else {
    return res.status(200).json({
      status: "Order search successful",
      order,
    });
  }
});

exports.findByUserID = catchAsync(async (req, res) => {
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

  const userID = account.user_id;

  if (!userID) {
    return res.status(400).json({
      status: "No id provided",
    });
  }

  var orders = await orderUtils.getByUserID(parseInt(userID));

  if (!orders) {
    return res.status(400).json({
      status: "No order found",
    });
  } else {
    return res.status(200).json({
      status: "Order search successful",
      orders,
      length: orders.length,
    });
  }
});

exports.checkOut = catchAsync(async (req, res) => {
  const data = req.body;

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

  const userID = account.user_id;
  var carts = await cartUtils.getByUserID(parseInt(userID));
  const total = carts.reduce((accumulator, currentItem) => {
    // Tính tổng tiền cho mỗi mặt hàng và cộng vào tổng
    return accumulator + currentItem.subTotal;
  }, 0);
  const totalProduct = carts.reduce((accumulator, currentItem) => {
    // Tính tổng tiền cho mỗi mặt hàng và cộng vào tổng
    return accumulator + currentItem.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      address: data.address,
      id_shippingType: data.id_shippingType,
      id_statusOrder: data.id_statusOrder,
      total: total,
      totalProduct: totalProduct,
      id_user: userID,
    },
  });

  if (!order) {
    return res.status(400).json({ message: "Create Order failed" });
  }

  for (const cart of carts) {
    await prisma.orderDetail.create({
      data: {
        id_order: order.id,
        id_product: cart.id_product,
        quantity: cart.quantity,
        subTotal: cart.subTotal,
        color: cart.color ?? "",
      },
    });
  }

  //Delete cart
  await cartUtils.deleteCartByUserID(parseInt(userID));

  return res.status(200).json({
    status: "Order search successful",
    checkOutID: order.id,
  });
});

exports.create = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const order = await prisma.order.create({
    data: data,
  });
  if (order) {
    res.status(200).json({ status: "Create order successfully!", order });
  }
});

exports.deleteById = catchAsync(async (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    res.status(400).json({ message: "No id provided" });
  }
  const order = await orderUtils.getById(id);
  if (!order) {
    res.status(400).json({ message: "No order found" });
  }
  const orderDelete = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  if (orderDelete) {
    res.status(200).json({ message: "Delete order successfully!" });
  }
});

exports.updateById = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const order = await orderUtils.getById(parseInt(data.id));
  if (!order) {
    res.status(400).json({ message: "No order found" });
  }
  const updateOrder = await prisma.order.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      address: data.address ?? order.address,
      id_shippingType: data.id_shippingType ?? order.id_shippingType,
      id_statusOrder: data.id_statusOrder ?? order.id_statusOrder,
      id_user: data.id_user ?? order.id_user,
      subTotal: data.subTotal ?? order.subTotal,
      total: data.subTotal ?? order.total,
      totalProduct: data.totalProduct ?? order.totalProduct,
    },
  });
  if (updateOrder) {
    res.status(200).json({ status: "Update order successfully!", updateOrder });
  }
});

function getUserInfoFromAccessToken(accessToken) {
  console.log("accessToken :>> ", accessToken);

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
