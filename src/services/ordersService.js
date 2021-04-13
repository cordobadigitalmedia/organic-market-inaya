import axios from "axios";

const getUser = async (params) => {
  let query = {
    maxRecords: 100,
    view: "All",
  };
  if ("filter" in params) {
    query.filterByFormula = params.filter;
  }
  try {
    const users = await axios.post(
      process.env.rooturl + "/api/airtable/getrecords",
      {
        basekey: "appZWL1olBEapBzpF",
        table: "Customers",
        query: query,
      }
    );
    if ("results" in users.data && users.data.results.length > 0) {
      return users.data.results;
    } else {
      return [];
    }
  } catch (err) {
    return { error: "Error getting data" };
  }
};

const addUser = async (params) => {
  const userExists = await getUser({
    filter: "Email = '" + params.record.email + "'",
  });
  if (userExists.length > 0) {
    return userExists;
  } else {
    let _field = {};
    _field.Email = params.record.email;
    _field.Name = params.record.name;
    _field.Phone = params.record.phone;
    try {
      const userResults = await axios.post(
        process.env.rooturl + "/api/airtable/createrecords",
        {
          basekey: "appZWL1olBEapBzpF",
          table: "Customers",
          records: [{ fields: _field }],
        }
      );
      if (
        "results" in userResults.data &&
        userResults.data.results.length > 0
      ) {
        return userResults.data.results;
      } else {
        return [];
      }
    } catch (err) {
      return { error: "Error getting data" };
    }
  }
};

const getOrders = async (params) => {
  let query = {
    maxRecords: 100,
    view: "All",
  };
  if ("filter" in params) {
    query.filterByFormula = params.filter;
  }
  try {
    const users = await axios.post(
      process.env.rooturl + "/api/airtable/getrecords",
      {
        basekey: "appZWL1olBEapBzpF",
        table: "Sales Orders",
        query: query,
      }
    );
    if ("results" in users.data && users.data.results.length > 0) {
      return users.data.results;
    } else {
      return [];
    }
  } catch (err) {
    return { error: "Error getting data" };
  }
};

const addOrder = async (params) => {
  let userid;
  const addUserResults = await addUser({
    record: params.user,
  });
  userid = addUserResults[0].id;
  let orders = params.records.map((rec) => {
    let _field = {};
    _field.Date = new Date();
    _field.Location = "Farmers Market";
    _field.Item = [rec.id];
    _field.Qty = rec.count;
    _field.Customers = [userid];
    return { fields: _field };
  });
  try {
    const orderResults = await axios.post(
      process.env.rooturl + "/api/airtable/createrecords",
      {
        basekey: "appZWL1olBEapBzpF",
        table: "Sales Orders",
        records: orders,
      }
    );
    if (
      "results" in orderResults.data &&
      orderResults.data.results.length > 0
    ) {
      return orderResults.data.results;
    } else {
      return [];
    }
  } catch (err) {
    return { error: "Error getting data" };
  }
};

const ordersService = {
  addOrder,
  getOrders,
};
export default ordersService;
