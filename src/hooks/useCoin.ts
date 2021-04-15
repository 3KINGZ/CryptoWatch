import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCrypto, deleteCrypto } from "../actions/crypto.action";
import { StateProps } from "../types/main";
import { write } from "../utils";

export const useCoin = () => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state: StateProps) => state.crypto);

  useEffect(() => {
    write("watchList", watchList);
  }, [watchList]);

  const isWatched = (id: string) => {
    const found = watchList.find((wl: any) => wl.id === id);

    if (found) {
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
