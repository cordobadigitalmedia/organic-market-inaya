import { DateTime } from "luxon";

const deadlineDay = 4;
const deadlineHour = 12;
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
  const today = DateTime.now().weekday;
  let disable = false;
  if ("Delivery Notice" in item.fields && item.fields["Delivery Notice"] > 0) {
    if (today > dayINeed - item.fields["Delivery Notice"]) {
      disable = true;
    }
  }
  return disable;
};

const dataParser = {
  findPickupDate,
  disableProduct,
};
export default dataParser;
