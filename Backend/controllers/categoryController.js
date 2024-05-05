const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const CategoryUtils = require("../utils/categoryUtils");
const AppError = require("../utils/appError");

const categoryUtils = new CategoryUtils();

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await prisma.category.findMany();
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({ message: "Please provide content to create category" });
    }
    const categoryFound = await categoryUtils.getCategoryByName(data.name);
    if (categoryFound) {
      res.status(400).json({
        message: "Category already exists, please create another one!",
      });
      return;
    }

    const categorySlugFound = await categoryUtils.getCategoryBySlug(data.slug);
    if (categorySlugFound) {
      res.status(400).json({
        message: "Category slug already exists, please create another one!",
      });
      return;
    }
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    res.status(200).json({ status: "Create category successfully!", category });
  } catch (e) {
    console.log(e);
  }
});

exports.getCategoryById = catchAsync(async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (!categoryId) {
      res.status(400).json({ message: "Please provide id to get category" });
    }
    const category = await categoryUtils.getCategoryById(categoryId);
    if (!category) {
      res.status(400).json({ message: "Category not exists, please create one!" });
    }
    res.status(200).json({ status: "Get category successfully!", category });
  } catch (e) {
    console.log(e);
  }
});

exports.getCategoryByName = catchAsync(async (req, res) => {
  try {
    const categoryName = req.params.name;
    if (!categoryName) {
      res.status(400).json({ message: "Please provide name to get category" });
    }
    const category = await categoryUtils.getCategoryByName(categoryName);
    if (!category) {
      res.status(400).json({ message: "Category not exists, please create one!" });
    }
    res.status(200).json({ status: "Get category successfully!", category });
  } catch (e) {
    console.log(e);
  }
});

exports.getCategoryBySlug = catchAsync(async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    if (!categorySlug) {
      res.status(400).json({ message: "Please provide slug to get category" });
    }
    const category = await categoryUtils.getCategoryBySlug(categorySlug);
    if (!category) {
      res.status(400).json({ message: "Category not exists, please create one!" });
    }
    res.status(200).json({ status: "Get category successfully!", category });
  } catch (e) {
    console.log(e);
  }
});

exports.deleteCategoryById = catchAsync(async (req, res) => {
  try {
    const categoryId = parseInt(req.body.id);
    if (!categoryId) {
      res.status(400).json({ message: "Please provide id to delete category" });
    }
    const category = await categoryUtils.getCategoryById(categoryId);
    if (!category) {
      res.status(400).json({ message: "Category not exists, please create one!" });
    }
    const deleteCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    if (deleteCategory) {
      res.status(200).json({ message: "Delete category successfully!" });
    }
  } catch (e) {
    console.log(e);
  }
});

exports.updateCategoryById = catchAsync(async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    const categoryId = parseInt(req.body.id);
    if (!categoryId) {
      res.status(400).json({ message: "Please provide id to get category" });
    }
    const data = req.body;
    if (!data) {
      res.status(400).json({ message: "Please provide content to update category" });
    }
    const category = await categoryUtils.getCategoryById(categoryId);
    if (!category) {
      res.status(400).json({ message: "Category not exists, please create one!" });
    }
    const updateCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name ?? category.name,
        slug: data.slug ?? category.slug,
      },
    });
    if (updateCategory) {
      res.status(200).json({ updateCategory });
    }
  } catch (e) {
    console.log(e);
  }
});
