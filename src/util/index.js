import {
  isPast,
  format,
  setYear,
  getYear,
  endOfDay,
  addYears,
  formatDuration,
  differenceInDays,
  differenceInYears,
} from "date-fns";
import ru from "date-fns/locale/ru";
import { MONTH_SYMBOLS_COUNT, INTL_CODE } from "../constants";

export const formatDate = (d) => {
  return format(new Date(d), "d MMMM yyyy", { locale: ru });
};

const todaysDate = Date.now();
export const formatAge = (d) => {
  return formatDuration(
    {
      years: differenceInYears(todaysDate, new Date(d)),
    },
    { locale: ru }
  );
};

export const cutBirthDate = (date) =>
  date.substring(0, date.indexOf(" ") + MONTH_SYMBOLS_COUNT + 1);

export const compareByFullName = (a, b) => {
  const { firstName: aFirstName, lastName: aLastName } = a;
  const { firstName: bFirstName, lastName: bLastName } = b;
  if (aFirstName < bFirstName) {
    return -1;
  }
  if (aFirstName > bFirstName) {
    return 1;
  }
  if (aLastName < bLastName) {
    return -1;
  }
  if (aLastName > bLastName) {
    return 1;
  }
  return 0;
};

const currentYear = getYear(todaysDate);

export const compareByClosestBirthday = (
  { birthday: aBirthday },
  { birthday: bBirthday }
) => {
  const aBirthDateInCurrentYear = setYear(new Date(aBirthday), currentYear);
  const aDaysToNextBirthday = isPast(endOfDay(aBirthDateInCurrentYear))
    ? differenceInDays(addYears(aBirthDateInCurrentYear, 1), todaysDate)
    : differenceInDays(aBirthDateInCurrentYear, todaysDate);

  const bBirthDateInCurrentYear = setYear(new Date(bBirthday), currentYear);
  const bDaysToNextBirthday = isPast(endOfDay(bBirthDateInCurrentYear))
    ? differenceInDays(addYears(bBirthDateInCurrentYear, 1), todaysDate)
    : differenceInDays(bBirthDateInCurrentYear, todaysDate);

  if (aDaysToNextBirthday < bDaysToNextBirthday) {
    return -1;
  }
  if (aDaysToNextBirthday > bDaysToNextBirthday) {
    return 1;
  }
  return 0;
};

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
