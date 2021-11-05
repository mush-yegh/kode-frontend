import criticalError from "./../styles/svg/criticalError.png";
import searchError from "./../styles/svg/searchError.png";
import { compareByFullName, compareByClosestBirthday } from "../util";

export const MODE = {
  dev: "development",
  prod: "production",
};

export const DEPARTMENTS = [
  { name: "all", title: "Все", isTabItem: true },
  { name: "design", title: "Designers", isTabItem: true },
  { name: "analytics", title: "Analysts", isTabItem: true },
  { name: "management", title: "Managers", isTabItem: true },
  { name: "ios", title: "iOS", isTabItem: true },
  { name: "android", title: "Android", isTabItem: true },
  { name: "qa", title: "QA", isTabItem: false },
  { name: "back_office", title: "Бэк-офис", isTabItem: false },
  { name: "frontend", title: "frontend", isTabItem: false },
  { name: "hr", title: "HR", isTabItem: false },
  { name: "pr", title: "PR", isTabItem: false },
  { name: "backend", title: "Backend", isTabItem: false },
  { name: "support", title: "Support", isTabItem: false },
];

export const ERROR_SCREEN_DATA = {
  emptySearch: {
    icon: searchError,
    message: "Мы никого не нашли",
    subMessage: "Попробуй скорректировать запрос",
    suggestion: null,
  },
  criticalError: {
    icon: criticalError,
    message: "Какой-то сверхразум все сломал",
    subMessage: "Постараемся быстро починить",
    suggestion: {
      text: "Попробовать снова",
      //TO DO - change to dispatch getUsers
      onclick: () => {
        window.location.reload(false);
      },
    },
  },
};

export const ERROR_TYPE = {
  critical: "criticalError",
  empty: "emptySearch",
};

export const SORT_BY = [
  {
    value: "alphabetically",
    name: "sortWorkers",
    label: "По алфавиту",
    comparer: compareByFullName,
  },
  {
    value: "closestBirthday",
    name: "sortWorkers",
    label: "По дню рождения",
    comparer: compareByClosestBirthday,
  },
];

export const MONTH_SYMBOLS_COUNT = 3;
