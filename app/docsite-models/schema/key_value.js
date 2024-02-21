/* jshint indent: 2 */
"use strict"

var methods = require("../KeyValue.js")
module.exports = function(sequelize, DataTypes) {
  var KeyValue_records = sequelize.define(
    "key_value_table",
    {
      id: {
        type         : DataTypes.INTEGER(11),
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true
      },
      name: {
        type     : DataTypes.STRING,
        allowNull: false,
        validate : {
          notEmpty: {
            msg: "Can't be empty."
          }
        }
      },
      value: {
        type     : DataTypes.INTEGER(11),
        allowNull: false,
        validate : {
          notEmpty: {
            msg: "Can't be empty."
          }
        }
      },
      created_at: {
        type     : DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type     : DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName      : "key_value_table",
      freezeTableName: true,
      timestamps     : true,
      createdAt      : "created_at", // imp as per rails convention must set in each model defination
      updatedAt      : "updated_at", // imp as per rails convention must set in each model defination
      classMethods   : methods.classMethods,
      hooks          : methods.hooks
    }
  )
  return KeyValue_records
}
