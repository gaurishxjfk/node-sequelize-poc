"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var rdsDb = require("config").rdsDb;

var options = {
  host: rdsDb.host,
  dialect: rdsDb.dialect,
  pool: {
    max: rdsDb.pool.max,
    min: rdsDb.pool.min,
    idle: rdsDb.pool.idle,
  },
  logging: false,
};

var sequelize = new Sequelize(
  rdsDb.database,
  rdsDb.username,
  rdsDb.password,
  options
);

var db = {};

fs.readdirSync(__dirname + "/schema")
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, "schema", file)); // import each model defination
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    // initialize associations
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize // db connection 
db.Sequelize = Sequelize // Sequelize functions

module.exports = db