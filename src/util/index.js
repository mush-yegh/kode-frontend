import {
  format,
  setYear,
  getYear,
  isPast,
  differenceInDays,
  endOfDay,
  addYears,
} from "date-fns";
import ru from "date-fns/locale/ru";
import { SORT_BY, MONTH_SYMBOLS_COUNT } from "../constants";

const dateFormatter = (d) => {
  return format(new Date(d), "d MMMM yyyy", { locale: ru });
};

export const prepareWorkersList = (workersList) => {
  return workersList
    .map((w) => ({
      ...w,
      isInSearch: true,
      isInSelectedDep: true,
      displayBirthdate: dateFormatter(w.birthday),
    }))
    .sort(SORT_BY[0].comparer);
};

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

const todaysDate = Date.now();
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

export const cutBirthDate = (date) =>
  date.substring(0, date.indexOf(" ") + MONTH_SYMBOLS_COUNT + 1);
