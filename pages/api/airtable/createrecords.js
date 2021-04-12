import RunCorsMidware from "../../../src/utils/corsMiddleware";
var Airtable = require("airtable");

export default async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  await RunCorsMidware(req, res);
  const basekey = req.body.basekey;
  const table = req.body.table;
  const records = req.body.records;
  try {
    const airtableBase = new Airtable({
      apiKey: process.env.AIRTABLE_KEY,
    }).base(basekey);
    const airtableQueryResults = await airtableBase(table).create(records);
    res.status(200).json({ results: airtableQueryResults });
  } catch (e) {
    console.error(e);
    res.status(200).json({ error: e });
  }
};
