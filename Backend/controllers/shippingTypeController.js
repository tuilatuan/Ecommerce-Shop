const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const ShippingTypeUtils = require("../utils/shippingTypeUtils");

const shippingTypeUtils = new ShippingTypeUtils();

exports.findAll = catchAsync(async (req, res) => {
  const shippingTypes = await prisma.shippingType.findMany();
  res.status(200).json({
    status: "success",
    length: shippingTypes.length,
    data: {
      shippingTypes,
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

  var shippingType = await shippingTypeUtils.getById(parseInt(query.id));

  if (!shippingType) {
    return res.status(400).json({
      status: "No shippingType found",
    });
  } else {
    return res.status(200).json({
      status: "ShippingType search successful",
      shippingType,
    });
  }
});

exports.findByName = catchAsync(async (req, res) => {
  const query = req.query;

  if (!query.name) {
    return res.status(400).json({
      status: "No name provided",
    });
  }

  var shippingType = await shippingTypeUtils.getByName(query.name);

  if (!shippingType) {
    return res.status(400).json({
      status: "No shippingType found",
    });
  } else {
    return res.status(200).json({
      status: "ShippingType search successful",
      shippingType,
    });
  }
});

exports.create = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const shippingType = await prisma.shippingType.create({
    data: data,
  });
  if (shippingType) {
    res
      .status(200)
      .json({ status: "Create shippingType successfully!", shippingType });
  }
});

exports.deleteById = catchAsync(async (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    res.status(400).json({ message: "No id provided" });
  }
  const shippingType = await shippingTypeUtils.getById(id);
  if (!shippingType) {
    res.status(400).json({ message: "No shippingType found" });
  }
  const shippingTypeDelete = await prisma.shippingType.delete({
    where: {
      id: id,
    },
  });
  if (shippingTypeDelete) {
    res.status(200).json({ message: "Delete shippingType successfully!" });
  }
});

exports.updateById = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: "No content provided" });
  }
  const shippingType = await shippingTypeUtils.getById(parseInt(data.id));
  if (!shippingType) {
    res.status(400).json({ message: "No shippingType found" });
  }
  const updateShippingType = await prisma.shippingType.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      name: data.name ?? shippingType.name,
      price: data.price ?? shippingType.price,
      total: data.total ?? shippingType.total,
    },
  });
  if (updateShippingType) {
    res
      .status(200)
      .json({ status: "Update shippingType successfully!", updateShippingType });
  }
});
