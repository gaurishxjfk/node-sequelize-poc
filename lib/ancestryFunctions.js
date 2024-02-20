function setAncestryFunctions(instanceObj, classObj) {
  instanceObj.getChildren = getChildren;
  instanceObj.getParent = getParent;
  instanceObj.getSiblings = getSiblings;
  instanceObj.setChildren = setChildren;
  classObj.getRoots = getRoots;
}
function getChildren(attributes, order, include) {
  var instance = this;
  var model = getModel.bind(instance)();

  if (instance.$modelOptions.name.singular == "Document") {
    include = [
      {
        model: instance.getModels().VirtualUrls,
      },
    ];
  }

  if (instance.$modelOptions.name.singular == "Product") {
    include = [
      {
        model: instance.getModels().Document,
      },
    ];
  }

  return model.findAll({
    where: {
      ancestry: JSON.stringify(instance.id),
    },
    order: order,
    attributes: attributes,
    include: include,
  });
}

function getParent(attributes, order, include) {
  var instance = this;
  var model = getModel.bind(instance)();
  return model.findOne({
    where: {
      id: instance.ancestry,
    },
    attributes: attributes,
    order: order,
    include: include,
  });
}
function setChildren(childrens) {
  var instance = this;
  var model = getModel.bind(instance)();

  return new Promise(function (fulfill, reject) {
    const removeAncestry = model
      .findAll({
        where: {
          ancestry: instance.id,
        },
      })
      .then(function (products) {
        const promises = products
          .filter((product) => !childrens.includes(product.id))
          .map((product) => product.update({ ancestry: null }));

        return Promise.all(promises);
      });

    const setAncestry = model
      .findAll({
        where: {
          id: {
            $in: childrens,
          },
        },
      })
      .then(function (products) {
        const promises = products.map((product) =>
          product.update({ ancestry: instance.id })
        );
        return Promise.all(promises);
      });

    Promise.all([removeAncestry, setAncestry]).then(fulfill).catch(reject);
  });
}
function getRoots(attributes, order, include) {
  return this.findAll({
    where: {
      name: {
        $not: [
          "Enterprise Backbone",
          "Messaging and Events Processing",
          "Integration and API Management",
          "Advanced Analytics",
          "Data Management",
          "Low Code Apps and Process Management",
          "Data Visualization",
        ],
      },
      $or: [
        {
          ancestry: null,
        },
        {
          ancestry: "",
        },
      ],
    },
    attributes: attributes,
    order: order,
    include: include,
  });
}

function getSiblings(attributes, order, include) {
  var instance = this;
  var model = getModel.bind(instance)();
  return new Promise(function (fulfill, reject) {
    model
      .findAll({
        where: {
          ancestry: instance.ancestry,
        },
        attributes: attributes,
        order: order,
        include: include,
      })
      .then(function (siblings) {
        siblings = siblings.filter(function (sibl) {
          return sibl.id !== instance.id;
        });
        fulfill(siblings);
      })
      .catch(function (error) {
        reject(siblings);
      });
  });
}
exports.setAncestryFunctions = setAncestryFunctions;
