const prisma = require("../prisma/prisma");

class ProductUtils {
  constructor() {}

  async getProductById(id) {
    return await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getProductByName(name) {
    return await prisma.product.findFirst({
      where: {
        name: name,
      },
    });
  }

  async getProductBySlug(slug) {
    return await prisma.product.findFirst({
      where: {
        slug: slug,
      },
    });
  }
}

module.exports = ProductUtils;
