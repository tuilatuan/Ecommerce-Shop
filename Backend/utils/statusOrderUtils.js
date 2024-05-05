const prisma = require("../prisma/prisma");

class StatusOrderUtils {
  constructor() { }

  async getById(id) {
    return await prisma.statusOrder.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getByName(name) {
    return await prisma.statusOrder.findFirst({
      where: {
        name: name
      },
    });
  }


}

module.exports = StatusOrderUtils;
