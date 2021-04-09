import _axios from "../api/_axios";
import * as types from "./types";

export const getCrypto = () => async (dispatch: any) => {
  dispatch({ type: types.GET_ALL_CRYPTO.REQUEST });

  try {
    const data = await _axios.get();
    dispatch({ type: types.GET_ALL_CRYPTO.SUCCESS, payload: data.data.data });
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
  }
};

export const deleteCrypto = (id: string) => (dispatch: any) => {
  dispatch({ type: types.DELETE_CRYPTO, payload: id });
};
