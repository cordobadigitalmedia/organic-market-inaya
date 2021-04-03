import axios from "axios";

const getVendors = async (params) => {
  let query = {
    maxRecords: 100,
    view: "All",
  };
  if ("filter" in params) {
    query.filterByFormula = params.filter;
  }  
  try {
    console.log(process.env.rooturl);
    const vendors = await axios.post(
      process.env.rooturl + "/api/airtable/getrecords",
      {
        basekey: "appZWL1olBEapBzpF",
        table: "Vendors",
        query: query
      }
    );
    if (
      "results" in vendors.data &&
      vendors.data.results.length > 0
    ) {
      return vendors.data.results;
    } else {
      return [];
    }
  } catch (err) {
    return { error: "Error getting data" };
  }
};

const vendorsService = {
    getVendors,
};
export default vendorsService;