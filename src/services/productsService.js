import axios from "axios";

const getProducts = async (params) => {
  let query = {
    maxRecords: 100,
    view: "All Vendors",
  };
  if ("filter" in params) {
    query.filterByFormula = params.filter;
  }
  try {
    const products = await axios.post(
      process.env.rooturl + "/api/airtable/getrecords",
      {
        basekey: "appZWL1olBEapBzpF",
        table: "Products",
        query: query
      }
    );
    if (
      "results" in products.data &&
      products.data.results.length > 0
    ) {
      return products.data.results;
    } else {
      return [];
    }
  } catch (err) {
    return { error: "Error getting data" };
  }
};

const productsService = {
    getProducts,
};
export default productsService;