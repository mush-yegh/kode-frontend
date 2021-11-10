import {
  isPast,
  getYear,
  setYear,
  endOfDay,
  addYears,
  differenceInDays,
} from "date-fns";

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

  return aDaysToNextBirthday - bDaysToNextBirthday;
};

export const compareByFullName = (a, b) => {
  const { fullName: aFullName } = a;
  const { fullName: bFullName } = b;

  return aFullName.localeCompare(bFullName);
};
