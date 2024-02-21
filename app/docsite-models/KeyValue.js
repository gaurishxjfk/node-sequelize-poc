//---------------- Dependencies & Declarations-------------------------------//

var ancestryFunctions = require("../../lib/ancestryFunctions.js");
var utils = require("../../lib/utils.js");

var setCommonSequelizeInstanceMethods = utils.setCommonSequelizeInstanceMethods;

var classMethods = {};
var instanceMethods = {};
var getterMethods = {};
var hooks = {};
//---------------- Module Exports-------------------------------//

exports.classMethods = classMethods;
exports.instanceMethods = instanceMethods;
exports.getterMethods = getterMethods;
exports.hooks = hooks;


hooks.beforeCreate = [
  setPublishedDate,
  before_product_create_set_slug,
  remove_slash /*restrictFolderPathLevels*/,
];

//----------------  Function associations-------------------------------

classMethods.getAllValues = getAllValues;
classMethods.getValuefor = getValuefor;
classMethods.updateValueat = updateValueat;

function setPublishedDate() {
  console.log("first setPublishedDate");
}

function before_product_create_set_slug() {
  console.log("first before_product_create_set_slug");
}

function remove_slash() {
  console.log("first remove_slash");
}

function getAllValues() {
  var keyValues = this;
  return keyValues.findAll().catch(function (error) {
    return utils.reject(error);
  });
}

function getValuefor(key) {
  var keyValues = this;
  return keyValues
    .findOne({
      where: { name: key },

      attributes: ["id", "name", "value"],
    })
    .catch(function (error) {
      return utils.reject(error);
    });
}

function updateValueat(key, value) {
  var keyValues = this;
  return keyValues
    .update(
      { value: value },
      {
        where: { name: key },
      }
    )
    .then(() => true)
    .catch(function (error) {
      return utils.reject(error);
    });
}

ancestryFunctions.setAncestryFunctions(instanceMethods, classMethods); // sets common ancestry functions
setCommonSequelizeInstanceMethods(instanceMethods); // sets common instance methods
