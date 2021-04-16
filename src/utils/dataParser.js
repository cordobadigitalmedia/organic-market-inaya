import { DateTime } from "luxon";

const deadlineDay = 5;
const deadlineHour = 19;
const dayINeed = 6; //

const findPickupDate = () => {
  const today = DateTime.now().weekday;
  const todayHour = DateTime.now().hour;
  if (today < deadlineDay) {
    return DateTime.now()
      .plus({ days: dayINeed - today })
      .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  } else if (today === deadlineDay && todayHour <= deadlineHour) {
    return DateTime.now()
      .plus({ days: dayINeed - today })
      .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  } else {
    return DateTime.now()
      .plus({ days: 7 - (today - dayINeed) })
      .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  }
};

const disableProduct = (item) => {
  let disable = false;
  if ("Initial Stock" in item.fields && item.fields["Initial Stock"] === 0) {
    disable = true;
  } else {
    const today = DateTime.now().weekday;
    if (
      "Delivery Notice" in item.fields &&
      item.fields["Delivery Notice"] > 0
    ) {
      if (today > dayINeed - item.fields["Delivery Notice"]) {
        disable = true;
      }
    }
  }
  return disable;
};

const dataParser = {
  findPickupDate,
  disableProduct,
};
export default dataParser;
