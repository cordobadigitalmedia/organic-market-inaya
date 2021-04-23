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

const showDeadline = () => {
  const today = DateTime.now().weekday;
  if (today <= deadlineDay) {
    return DateTime.now()
      .set({ hour: deadlineHour, minute: 0 })
      .plus({ days: deadlineDay - today })
      .toFormat("EEEE 'at' hh:mm a");
  } else {
    return DateTime.now()
      .set({ hour: deadlineHour, minute: 0 })
      .plus({ days: 7 - (today - deadlineDay) })
      .toFormat("EEEE 'at' hh:mm a");
  }
};

const disableProduct = (item) => {
  let disable = false;
  let reason = "";
  if ("Initial Stock" in item.fields && item.fields["Initial Stock"] === 0) {
    disable = true;
    return { status: disable, reason: "stock" };
  }
  const today = DateTime.now().weekday;
  if ("Delivery Notice" in item.fields && item.fields["Delivery Notice"] > 0) {
    if (today > dayINeed - item.fields["Delivery Notice"]) {
      disable = true;
      return { status: disable, reason: "delivery" };
    }
  }
  return { status: disable, reason: "" };
};

const dataParser = {
  findPickupDate,
  disableProduct,
  showDeadline,
};
export default dataParser;
