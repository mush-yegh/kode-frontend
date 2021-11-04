import { MODE } from "./../constants";

export const isDev = () => {
  return process.env.NODE_ENV === MODE.prod;
};

export const API_URL =
  "https://stoplight.io/mocks/kode-education/trainee-test/25143926";
