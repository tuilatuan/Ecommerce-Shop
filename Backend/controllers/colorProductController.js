const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const ColorProductUtils = require("../utils/colorProductUtils");
const AppError = require("../utils/appError");

const colorProductUtils = new ColorProductUtils();

exports.getAllColorProducts = catchAsync(async (req, res) => {
  const colorProducts = await prisma.colorProduct.findMany();
  res.status(200).json({
    status: "success",
    results: colorProducts.length,
    data: {
      colorProducts,
    },
  });
});

exports.createColorProduct = catchAsync(async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res
        .status(400)
        .json({ message: "Please provide content to create color product" });
    }
    const colorProductFound = await colorProductUtils.getColorProductByName(
      data.name
    );
    if (colorProductFound) {
      res.status(400).json({
        message: "Color product already exists, please create another one!",
      });
      return;
    }

    const colorProductCodeFound = await colorProductUtils.getColorProductByCode(
      data.codeColor
    );
    if (colorProductCodeFound) {
      res.status(400).json({
        message:
          "Color product's code already exists, please create another one!",
      });
      return;
    }
    const colorProduct = await prisma.colorProduct.create({
      data: {
        name: data.name,
        codeColor: data.codeColor,
        product_id: data.product_id,
      },
    });
    res
      .status(200)
      .json({ status: "Create color product successfully!", colorProduct });
  } catch (e) {
    console.log(e);
  }
});

exports.getColorProductById = catchAsync(async (req, res) => {
  try {
    const colorProductId = parseInt(req.params.id);
    if (!colorProductId) {
      res
        .status(400)
        .json({ message: "Please provide id to get color product" });
    }
    const colorProduct = await colorProductUtils.getColorProductById(
      colorProductId
    );
    if (!colorProduct) {
      res
        .status(400)
        .json({ message: "Color product not exists, please create one!" });
    }
    res
      .status(200)
      .json({ status: "Get color product successfully!", colorProduct });
  } catch (e) {
    console.log(e);
  }
});

exports.getColorProductByName = catchAsync(async (req, res) => {
  try {
    const colorProductName = req.params.name;
    if (!colorProductName) {
      res
        .status(400)
        .json({ message: "Please provide name to get color product" });
    }
    const colorProduct = await colorProductUtils.getColorProductByName(
      colorProductName
    );
    if (!colorProduct) {
      res
        .status(400)
        .json({ message: "Color product not exists, please create one!" });
    }
    res
      .status(200)
      .json({ status: "Get color product successfully!", colorProduct });
  } catch (e) {
    console.log(e);
  }
});

exports.getColorProductByCode = catchAsync(async (req, res) => {
  try {
    const colorProductCode = req.params.code;
    if (!colorProductCode) {
      res
        .status(400)
        .json({ message: "Please provide code to get color product" });
    }
    const colorProduct = await colorProductUtils.getColorProductByCode(
      colorProductCode
    );
    if (!colorProduct) {
      res
        .status(400)
        .json({ message: "Color product not exists, please create one!" });
    }
    res
      .status(200)
      .json({ status: "Get color product successfully!", colorProduct });
  } catch (e) {
    console.log(e);
  }
});

exports.deleteColorProductById = catchAsync(async (req, res) => {
  try {
    const colorProductId = parseInt(req.params.id);
    if (!colorProductId) {
      res
        .status(400)
        .json({ message: "Please provide id to delete color product" });
    }
    const colorProduct = await colorProductUtils.getColorProductById(
      colorProductId
    );
    if (!colorProduct) {
      res
        .status(400)
        .json({ message: "Color product not exists, please create one!" });
    }
    const deleteColorProduct = await prisma.colorProduct.delete({
      where: {
        id: colorProductId,
      },
    });
    if (deleteColorProduct) {
      res.status(200).json({ message: "Delete color product successfully!" });
    }
  } catch (e) {
    console.log(e);
  }
});

exports.updateColorProductById = catchAsync(async (req, res) => {
  try {
    const colorProductId = parseInt(req.params.id);
    if (!colorProductId) {
      res
        .status(400)
        .json({ message: "Please provide id to update color product" });
    }
    const data = req.body;
    if (!data) {
      res
        .status(400)
        .json({ message: "Please provide content to update color product" });
    }
    const colorProduct = await colorProductUtils.getColorProductById(
      colorProductId
    );
    if (!colorProduct) {
      res
        .status(400)
        .json({ message: "Color product not exists, please create one!" });
    }
    const updateColorProduct = await prisma.colorProduct.update({
      where: {
        id: colorProductId,
      },
      data: {
        name: data.name ?? colorProduct.name,
        codeColor: data.codeColor ?? colorProduct.codeColor,
        product_id: data.product_id ?? colorProduct.product_id,
      },
    });
    if (updateColorProduct) {
      res.status(200).json({ updateColorProduct });
    }
  } catch (e) {
    console.log(e);
  }
});
