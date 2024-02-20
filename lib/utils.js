function setCommonSequelizeInstanceMethods(instanceObj) {
  instanceObj.getModel = getModel;
  instanceObj.getModels = getModels;
}
function getModel() { // get model of current instance for sequelize orm
  var instance = this
  var modelName = instance.$modelOptions.name.singular
  var models = instance.$modelOptions.sequelize.models
  return models[modelName]
}

function getModels() { // get models of current instance for sequelize orm
  var instance = this
  var modelName = instance.$modelOptions.name.singular
  return instance.$modelOptions.sequelize.models
}
exports.setCommonSequelizeInstanceMethods = setCommonSequelizeInstanceMethods;
