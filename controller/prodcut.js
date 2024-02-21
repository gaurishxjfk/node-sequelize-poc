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

exports.getTotalVisitorsToday = getTotalVisitorsToday;
