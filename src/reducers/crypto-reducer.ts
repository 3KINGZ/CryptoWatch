import * as types from "../actions/types";

interface Crypto {
  loading: boolean;
  cryptos: [] | null;
  message: string;
  watchList: [];
}

const initialState: Crypto = {
  loading: false,
  cryptos: [],
  message: "",
  watchList: [],
};

interface ActionProps {
  type: string;
  payload: [] | string;
}

const cryptoReducer = (state = initialState, action: ActionProps) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_CRYPTO.REQUEST:
      return { ...state, loading: true };

    case types.ADD_CRYPTO:
      return { ...state, watchList: [...state.watchList, payload] };

    case types.DELETE_CRYPTO:
      const filteredItems = state.watchList.filter(
        (wl: any) => wl.id !== payload,
      );
      return { ...state, watchList: [...filteredItems] };

    case types.GET_ALL_CRYPTO.SUCCESS:
      return { ...state, message: "", cryptos: payload, loading: false };

    case types.GET_ALL_CRYPTO.FAILURE:
      return {
        ...state,
        message: payload || "unable to fetch data",
        loading: false,
      };

    default:
      return state;
  }
};

export default cryptoReducer;
