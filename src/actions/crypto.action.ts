import _axios from "../api/_axios";
import * as types from "./types";
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
  const state = getState().crypto;
  const isFound = state.watchList.find((crypto: any) => crypto.id === data.id);

  if (!isFound) {
    dispatch({ type: types.ADD_CRYPTO, payload: data });
    write("watchList", state.watchList);
    return true;
  }
};

export const syncWatchList = (watchList: any) => (dispatch: any) => {
  dispatch({ type: types.SYNC_WATCHLIST, payload: watchList });
};

export const deleteCrypto = (id: string) => (dispatch: any) => {
  dispatch({ type: types.DELETE_CRYPTO, payload: id });
  return true;
};
