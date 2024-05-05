const prisma = require("../prisma/prisma");

class ColorProductUtils {
  constructor() {}

  async getColorProductById(id) {
    return await prisma.colorProduct.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getColorProductByName(name) {
    return await prisma.colorProduct.findFirst({
      where: {
        name: name,
      },
    });
  }

  async getColorProductByCode(code) {
    return await prisma.colorProduct.findFirst({
      where: {
        codeColor: code,
      },
    });
  }
}

module.exports = ColorProductUtils;
