import criticalError from "./../styles/svg/criticalError.png";
import searchError from "./../styles/svg/searchError.png";
import {
  compareByFullName,
  compareByClosestBirthday,
} from "../helpers/comparator";

export const CONFIG = {
  MODE: {
    DEV: "development",
    PROD: "production",
  },
  HEADERS: {
    SUCCESS: { Prefer: "code=200, dynamic=true" },
    ERROR: { Prefer: "code=500, dynamic=true" },
  },
};

export const DEPARTMENTS = [
  { id: "all", name: "Все", isMenuItem: true },
  { id: "design", name: "Designers", isMenuItem: true },
  { id: "analytics", name: "Analysts", isMenuItem: true },
  { id: "management", name: "Managers", isMenuItem: true },
  { id: "ios", name: "IOS", isMenuItem: true },
  { id: "android", name: "Android", isMenuItem: true },
  { id: "qa", name: "QA", isMenuItem: false },
  { id: "back_office", name: "Бэк-офис", isMenuItem: false },
  { id: "frontend", name: "frontend", isMenuItem: false },
  { id: "hr", name: "HR", isMenuItem: false },
  { id: "pr", name: "PR", isMenuItem: false },
  { id: "backend", name: "Backend", isMenuItem: false },
  { id: "support", name: "Support", isMenuItem: false },
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
      action: () => {
        window.location.reload(false);
      },
    },
  },
};

export const ERROR_TYPE = {
  CRITICAL: "criticalError",
  EMPTY: "emptySearch",
};

export const SORT_BY = [
  {
    value: "alphabetically",
    label: "По алфавиту",
    comparer: compareByFullName,
  },
  {
    value: "closestBirthday",
    label: "По дню рождения",
    comparer: compareByClosestBirthday,
  },
];

export const MONTH_SYMBOLS_COUNT = 3;

export const ROUTES = {
  HOME: { pathname: "/", class_name: "home_screen" },
  PROFILE: { pathname: "/profile", class_name: "profile" },
};

export const INTL_CODE = "+7";
