const ormDB = require("../app/docsite-models");

const KeyValue = ormDB.key_value_table;

async function getTotalVisitorsToday(req, res) {
  //getting visitors count data from SQL DB
  try {
    const visitors = await KeyValue.findOne({ where: { name: 'view_count' } });
    console.log({ type: "Visitors today", count: visitors.value })
    return res.send({ type: "Visitors today", count: visitors.value });
  } catch (e) {
    console.log(e);
    return res.send({ type: "Visitors today", count: "NA" });
  }
}

async function insertValueat(req, res) {

  try {
    const newEntry = await KeyValue.create({
      id: req.body.id,
      name: req.body.name,
      value: req.body.value,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log(`New user added with ID ${newEntry.id}`);
    return res.json(newEntry);
  } catch (error) {
    console.log(error);

    return utils.reject(error);
  }
}

exports.getTotalVisitorsToday = getTotalVisitorsToday;
exports.insertValueat = insertValueat;
