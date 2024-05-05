const prisma = require("../prisma/prisma");

class OrderUtils {
  constructor() { }

  async getById(id) {
    return await prisma.order.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getByUserID(id) {
    return await prisma.order.findMany({
      where: {
        id_user:id
      },
    });
  }


}

module.exports = OrderUtils
