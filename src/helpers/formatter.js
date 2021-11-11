import { format, formatDuration, differenceInYears } from "date-fns";
import ru from "date-fns/locale/ru";
import { MONTH_SYMBOLS_COUNT } from "../constants";
import { INTL_CODE } from "../constants";

export const formatDate = (d) => {
  return format(new Date(d), "d MMMM yyyy", { locale: ru });
};

export const formatAge = (d) => {
  return formatDuration(
    {
      years: differenceInYears(Date.now(), new Date(d)),
    },
    { locale: ru }
  );
};

export const cutBirthDate = (date) =>
  date.substring(0, date.indexOf(" ") + MONTH_SYMBOLS_COUNT + 1);

export const formatPhoneNumber = (n) => {
  const match = n.replace(/\D/g, "").match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return [
      INTL_CODE,
      " (",
      match[1],
      ") ",
      match[2],
      " ",
      match[3],
      " ",
      match[4],
    ].join("");
  }
  return n;
};
