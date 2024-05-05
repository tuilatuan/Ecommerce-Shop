const prisma = require("../prisma/prisma");

class OrderDetailUtils {
  constructor() { }

  async getById(id) {
    return await prisma.orderDetail.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getByOrderID(id) {
    return await prisma.orderDetail.findMany({
      where: {
        id_order:id
      },
    });
  }


}

module.exports = OrderDetailUtils
