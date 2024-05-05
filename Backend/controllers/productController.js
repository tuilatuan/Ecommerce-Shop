const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const ProductUtils = require("../utils/productUtils");
const AppError = require("../utils/appError");
const express = require("express");

const productUtils = new ProductUtils();

//Firebase

const { upload, uploadMultiple } = require(`../middlewares/multer`);

const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("../configs/firebase.config");
//firebase end

exports.getAllProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
  const limit = parseInt(req.query.limit) || 65; // Số lượng sản phẩm trên mỗi trang, mặc định là 9
  const skip = (page - 1) * limit; // Vị trí bắt đầu của dữ liệu cần lấy
  const minPrice = parseInt(req.query.minPrice) || 0; // Giá sản phẩm tối thiểu, mặc định là 0
  const maxPrice = parseInt(req.query.maxPrice) || 9999999999; // Giá sản phẩm tối đa, mặc định là vô cực
  const productName = req.query.search || "";
  let categories = req.query.category || [];
  if (!Array.isArray(categories)) {
    categories = [parseInt(categories)];
  } else {
    categories = categories.map((category) => parseInt(category));
  }
  // Lấy tổng số lượng sản phẩm parseInt
  let totalCount;

  let where = {
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
  };
  if (productName.trim() !== "") {
    where = {
      ...where,
      name: {
        contains: productName,
      },
    };
  }
  if (where.name && where.name.contains) {
    where.name.contains = where.name.contains.toLowerCase();
  }
  // Nếu có tham số category_id, thêm điều kiện lọc theo category_id
  if (categories.length > 0) {
    where = {
      ...where,
      category_id: {
        in: categories,
      },
    };
  }

  // Lấy tổng số lượng sản phẩm dựa trên điều kiện where
  totalCount = await prisma.product.count({
    where: where,
  });

  // Lấy sản phẩm theo giới hạn giá và phân trang
  const products = await prisma.product.findMany({
    where: where,
    skip: skip,
    take: limit,
  });

  // Tính toán số lượng trang
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    limit: limit,
    total: totalCount,
    minPrice: minPrice,
    maxPrice: maxPrice,
    page: page,
    totalPages: totalPages,
  };

  res.status(200).json({
    status: "success",
    data: {
      pagination: pagination,
      products: products,
    },
  });
});

exports.getProductBySlug = catchAsync(async (req, res) => {
  try {
    const productSlug = req.params.slug;
    if (!productSlug) {
      res.status(400).json({ message: "Please provide slug to get product" });
    }
    const product = await productUtils.getProductBySlug(productSlug);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }

    res.status(200).json({
      status: "Get product successfully!",
      data: {
        product,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//đống dưới chưa xà

exports.handleProductCreation = async (req, res) => {
  try {
    const data = req.body;
    const file = {
      type: req.file.mimetype,
      buffer: req.file.buffer,
    };
    const result = await this.createProduct(data, file);
    console.log("result :>> ", result);
    res.send(result); // Trả về kết quả từ hàm createProduct
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createProduct = async (data, file) => {
  try {
    if (!data) {
      return { status: 400, message: "Please provide content to create product" };
    }

    const productFound = await productUtils.getProductByName(data.name);
    if (productFound) {
      return {
        status: 400,
        message: "Product already exists, please create another one!",
      };
    }

    const productSlugFound = await productUtils.getProductBySlug(data.slug);
    if (productSlugFound) {
      return {
        status: 400,
        message: "Product's slug already exists, please create another one!",
      };
    }

    // Lưu URL của ảnh
    const imageUrl = await uploadImage(file, "single");
    const numberPart = imageUrl.match(/\d+/)[0];
    const newUrlImage = `https://firebasestorage.googleapis.com/v0/b/webshopbackend183.appspot.com/o/images%2F${numberPart}?alt=media`;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        price: parseInt(data.price),
        description: data.description,
        category_id: parseInt(data.category_id),
        images: imageUrl ? newUrlImage : null,
      },
    });

    if (product) {
      return { status: 200, message: "Create product successfully!", product };
    } else {
      return { status: 400, message: "Failed to create product!" };
    }
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Internal server error" };
  }
};

exports.getProductById = catchAsync(async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      res.status(400).json({ message: "Please provide id to get product" });
    }
    const product = await productUtils.getProductById(productId);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }
    res.status(200).json({ status: "Get Product successfully!", product });
  } catch (e) {
    console.log(e);
  }
});

exports.getProductByName = catchAsync(async (req, res) => {
  try {
    const productName = req.params.name;
    if (!productName) {
      res.status(400).json({ message: "Please provide name to get product" });
    }
    const product = await productUtils.getCategoryByName(productName);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }
    res.status(200).json({ status: "Get product successfully!", product });
  } catch (e) {
    console.log(e);
  }
});

exports.getProductBySlug = catchAsync(async (req, res) => {
  try {
    const productSlug = req.params.slug;
    if (!productSlug) {
      res.status(400).json({ message: "Please provide slug to get product" });
    }
    const product = await productUtils.getProductBySlug(productSlug);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }
    res.status(200).json({ status: "Get product successfully!", product });
  } catch (e) {
    console.log(e);
  }
});

exports.deleteProductById = catchAsync(async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      res.status(400).json({ message: "Please provide id to delete product" });
    }
    const product = await productUtils.getProductById(productId);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }
    const deleteProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    if (deleteProduct) {
      res.status(200).json({ message: "Delete product successfully!" });
    }
  } catch (e) {
    console.log(e);
  }
});

exports.updateProductById = catchAsync(async (req, res) => {
  try {
    const productId = parseInt(req.body.id);
    if (!productId) {
      res.status(400).json({ message: "Please provide id to delete product" });
    }
    const data = req.body;
    if (!data) {
      res.status(400).json({ message: "Please provide content to update product" });
    }
    const product = await productUtils.getProductById(productId);
    if (!product) {
      res.status(400).json({ message: "Product not exists, please create one!" });
    }
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name ?? product.name,
        slug: data.slug ?? product.slug,
        price: data.price ?? product.price,
        images: data.images ?? product.images,
        description: data.description ?? product.description,
        category_id: data.category_id ?? product.category_id,
      },
    });
    if (updateProduct) {
      res.status(200).json({ updateProduct });
    }
  } catch (e) {
    console.log(e);
  }
});

async function uploadImage(file, quantity) {
  const storageF8 = getStorage();

  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  if (quantity == "single") {
    const dateTime = Date.now();

    const fileName = `images/${dateTime}`;

    const storageRef = ref(storageF8, fileName);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return fileName;
  }

  if (quantity == "multiple") {
    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();

      const fileName = `images/${dateTime}`;

      const storageRef = ref(storageF8, fileName);
      const metadata = {
        contentType: file.iamges[1].mimetype,
      };

      const saveIamge = await Image.create({ iamgeUrl: fileName });

      file.item.imageId.push({ _id: saveIamge._id });

      await file.item.save();
      await uploadBytesResumable(storageRef, file.iamges[i].buffer, metadata);
    }
    return;
  }
}
