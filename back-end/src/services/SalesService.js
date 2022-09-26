const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { Sales, SalesProducts } = require('../database/models');

const sequelize = new Sequelize(config.development);

class SalesService {
  constructor() {
    this.sales = Sales;
    this.salesProducts = SalesProducts;
  }
  
/*
  {
    "products": [
      {
        "productId": 1,
        "quantity": 2,
      },
      {
        "productId": 2,
        "quantity": 1,
      },
    ],
    "sales": {
      "userId": 3,
      "sellerId": 2,
      "totalPrice": 30.00,
      "deliveryAdress": "rua A",
      "deliveryNumber": 2
    }
  }
*/

  async create(obj) {
    const t = await sequelize.transaction();
    try {
      const { products, sales } = obj;
      const result = await this.sales.create(sales, { raw: true, transaction: t });
      const saleInfo = result.toJSON();
      const array = products.map((elem) => ({
        saleId: saleInfo.id,
        productId: elem.productId,
        quantity: elem.quantity,
      }));
      await this.salesProducts.bulkCreate(array, { transaction: t });
      await t.commit();
      return saleInfo;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async readAll() {
    const result = await this.sales.findAll();
    return result;
  }

  async readOne(id) {
    const result = await this.sales.findByPk(id);
    return result;
  }

  async update(id, obj) {
    const result = await this.sales.update(
      obj,
      { where: { id } },
    );
    return result;
  }

  async delete(id) {
    console.log(id);
    await this.sales.destroy({
      where: { id },
    });
  }
}

module.exports = SalesService;