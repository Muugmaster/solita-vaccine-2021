'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      healthCareDistrict: DataTypes.STRING,
      orderNumber: DataTypes.INTEGER,
      responsiblePerson: DataTypes.STRING,
      injections: DataTypes.INTEGER,
      arrived: DataTypes.DATE,
      vaccine: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'orders',
    }
  )
  return Orders
}
