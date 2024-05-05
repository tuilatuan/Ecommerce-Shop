const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const OrderDetailUtils = require("../utils/orderDetailUtils");

const orderDetailUtils = new OrderDetailUtils();

exports.findAll = catchAsync(async (req, res) => {
  const orderDetails = await prisma.orderDetail.findMany();
  res.status(200).json({
    status: "success",
    length: orderDetails.length,
    data: {
      orderDetails,
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

  var orderDetail = await orderDetailUtils.getById(parseInt(query.id));

  if (!orderDetail) {
    return res.status(400).json({
      status: "No orderDetail found",
    });
  } else {
    return res.status(200).json({
      status: "OrderDetail search successful",
      orderDetail,
    });
  }
});

exports.findByOrderID = catchAsync(async (req, res) => {
  const query = req.params;

  if (!query.orderID) {
    return res.status(400).json({
      status: "No id provided aaaaa",
    });
  }

  var orderDetails = await orderDetailUtils.getByOrderID(parseInt(query.orderID));

  if (!orderDetails) {
    return res.status(400).json({
      status: "No orderDetails found",
    });
  } else {
    return res.status(200).json({
      status: "OrderDetails search successful",
      orderDetails,
      length: orderDetails.length,
    });
  }
});

exports.create = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const orderDetail = await prisma.orderDetail.create({
    data: data,
  });
  if (orderDetail) {
    res
      .status(200)
      .json({ status: "Create orderDetail successfully!", orderDetail });
  }
});

exports.deleteById = catchAsync(async (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    res.status(400).json({ message: "No id provided" });
  }
  const orderDetail = await orderDetailUtils.getById(id);
  if (!orderDetail) {
    res.status(400).json({ message: "No orderDetail found" });
  }
  const orderDetailDelete = await prisma.orderDetail.delete({
    where: {
      id: id,
    },
  });
  if (orderDetailDelete) {
    res.status(200).json({ message: "Delete orderDetail successfully!" });
  }
});

exports.updateById = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const orderDetail = await orderDetailUtils.getById(parseInt(data.id));
  if (!orderDetail) {
    res.status(400).json({ message: "No orderDetail found" });
  }
  const updateOrderDetail = await prisma.orderDetail.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      Color: data.color ?? orderDetail.Color,
      id_order: data.id_order ?? orderDetail.id_order,
      id_product: data.id_product ?? orderDetail.id_product,
      quantity: data.quantity ?? orderDetail.quantity,
      totalProduct: data.quantity ?? orderDetail.quantity,
    },
  });
  if (updateOrderDetail) {
    res
      .status(200)
      .json({ status: "Update orderDetail successfully!", updateOrderDetail });
  }
});
