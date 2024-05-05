const prisma = require("../prisma/prisma");

class ShippingTypeUtils {
  constructor() { }

  async getById(id) {
    return await prisma.shippingType.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getByName(name) {
    return await prisma.shippingType.findFirst({
      where: {
        name: name
      },
    });
  }


}

module.exports = ShippingTypeUtils
