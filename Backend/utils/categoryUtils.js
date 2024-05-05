const prisma = require("../prisma/prisma");

class CategoryUtils {
  constructor() {}

  async getCategoryById(id) {
    return await prisma.category.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getCategoryByName(name) {
    return await prisma.category.findFirst({
      where: {
        name: name,
      },
    });
  }

  async getCategoryBySlug(slug) {
    return await prisma.category.findFirst({
      where: {
        slug: slug,
      },
    });
  }
}

module.exports = CategoryUtils;
