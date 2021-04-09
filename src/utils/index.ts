import { isWatched } from "./index";
import { imageURL } from "./constants";

export const generateTypes = (type: string) => {
  return {
    REQUEST: type + " REQUEST",
    SUCCESS: type + " SUCCESS",
    FAILURE: type + " FAILURE",
  };
};

export const generateImageURL = (id: string) => {
  return imageURL + id + "/32.png?v=2";
};

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
