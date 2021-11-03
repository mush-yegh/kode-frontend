import criticalError from "./../styles/svg/criticalError.png";
import searchError from "./../styles/svg/searchError.png";

export const MODE = {
  dev: "development",
  prod: "production",
};

export const DEPARTMENTS = [
  "Все",
  "Designers",
  "Analysts",
  "Managers",
  "iOS",
  "Android",
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
