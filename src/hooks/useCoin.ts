import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCrypto, deleteCrypto } from "../actions/crypto.action";
import { write } from "../utils";

export const useCoin = () => {
  const dispatch = useDispatch();
  const { watchList, watchListMap } = useSelector(
    (state: StateProps) => state.crypto,
  );

  useEffect(() => {
    write("watchList", watchList);
    write("watchListMap", watchListMap);
  }, [watchList]);

  const isWatched = (id: string) => {
    if (watchListMap?.[id]) {
      return true;
    }

    return false;
  };

  const _addCrypto = (data: {}) => {
    dispatch(addCrypto(data));
  };

  const _deleteCrypto = (id: string) => {
    dispatch(deleteCrypto(id));
  };

  return [isWatched, _addCrypto, _deleteCrypto];
};
