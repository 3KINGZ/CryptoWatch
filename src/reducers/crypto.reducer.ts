import { WatchList } from "./../screens/WatchList";
import * as types from "../actions/types";
interface Crypto {
  loading: boolean;
  cryptos: [] | null;
  message: string;
  watchList: [] | any;
  watchListMap: any;
}

const initialState: Crypto = {
  loading: false,
  cryptos: [],
  message: "",
  watchList: [],
  watchListMap: {},
};

interface ActionProps {
  type: string;
  payload: any;
}

const cryptoReducer = (state = initialState, action: ActionProps) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_CRYPTO.REQUEST:
      return { ...state, loading: true };

    case types.ADD_CRYPTO:
      const watchListMap = state.watchListMap;
      watchListMap[payload.id] = true;

      return {
        ...state,
        watchList: [...state.watchList, payload],
        watchListMap: watchListMap,
      };

    case types.DELETE_CRYPTO:
      const filteredItems = state.watchList.filter(
        (wl: any) => wl.id !== payload,
      );
      const map: { [key: string]: any } = state.watchListMap;
      delete map[payload];
      return { ...state, watchList: [...filteredItems], watchListMap: map };

    case types.GET_ALL_CRYPTO.SUCCESS:
      return { ...state, message: "", cryptos: payload, loading: false };

    case types.GET_ALL_CRYPTO.FAILURE:
      return {
        ...state,
        message: payload || "unable to fetch data",
        loading: false,
      };

    case types.SYNC_WATCHLIST:
      return {
        ...state,
        watchList: [...state.watchList, ...payload.watchList],
        watchListMap: { ...state.watchListMap, ...payload.watchListMap },
      };

    default:
      return state;
  }
};

export default cryptoReducer;
