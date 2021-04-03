import RunCorsMidware from "../../../src/utils/corsMiddleware";
var Airtable = require("airtable");

export default async (req, res) => {
  await RunCorsMidware(req, res);
  const basekey = req.body.basekey;
  const table = req.body.table;
  const query = req.body.query;
  try {
    const airtableBase = new Airtable({
      apiKey: process.env.AIRTABLE_KEY,
    }).base(basekey);
    let airtableRecords = [];
    const airtableQueryResults = await airtableBase(table)
      .select(query)
      .eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
          airtableRecords.push(record);
        });
        fetchNextPage();
      });
    res.status(200).json({ results: airtableRecords });
  } catch (e) {
    console.error(e);
    res.status(200).json({ error: e });
  }
};
