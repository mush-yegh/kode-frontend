import { MODE } from "./../constants";

export const isDev = () => {
  return process.env.NODE_ENV === MODE.dev;
};
