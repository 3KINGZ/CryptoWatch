import * as types from "./types";
import _axios from "../api/_axios";
import { write } from "../utils";

export const getCrypto = () => async (dispatch: any) => {
  dispatch({ type: types.GET_ALL_CRYPTO.REQUEST });

  try {
    let data = await _axios.get();
    data = data.data.data;
    dispatch({ type: types.GET_ALL_CRYPTO.SUCCESS, payload: data });
    write("cryptos", data);
  } catch (e) {
    dispatch({
      type: types.GET_ALL_CRYPTO.FAILURE,
      payload: "Error fetching Coin data",
    });
  }
};

export const addCrypto = (data: any) => (dispatch: any, getState: any) => {
  const { watchList, watchListMap } = getState().crypto;
  const isFound = watchListMap?.[data.id];

  if (!isFound) {
    dispatch({ type: types.ADD_CRYPTO, payload: data });
    write("watchList", watchList);
    return true;
  }
};

export const deleteCrypto = (id: string) => (dispatch: any) => {
  dispatch({ type: types.DELETE_CRYPTO, payload: id });
  return true;
};

export const syncWatchList = (watchList: any, watchListMap: any) => (
  dispatch: any,
) => {
  dispatch({
    type: types.SYNC_WATCHLIST,
    payload: { watchList, watchListMap },
  });
};
