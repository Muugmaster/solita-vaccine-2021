'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class vaccinations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vaccinations.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      gender: DataTypes.STRING,
      sourceBottle: DataTypes.STRING,
      injected: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'vaccinations',
    }
  )
  return vaccinations
}
