const prisma = require("../prisma/prisma");

class CartUtils {
  constructor() { }

  async getById(id) {
    return await prisma.cart.findFirst({
      where: {
        id: id
      },
    });
  }

  async getByUserID(id) {
    return await prisma.cart.findMany({
      where: {
        id_user: id
      },
      include: {
        Product: true
      }
    });
  }

  async deleteCartByUserID(id) {
    return await prisma.cart.deleteMany({
      where: {
        id_user: id
      }
    })
  }

}

module.exports = CartUtils
