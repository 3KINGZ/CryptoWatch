import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCrypto, syncWatchList } from "../actions/crypto.action";
import { StateProps } from "../types/main";
import { read } from "../utils";

export const useOnLoad = () => {
  const dispatch = useDispatch();

  const { cryptos, message, loading, watchList } = useSelector(
    (state: StateProps) => state.crypto,
  );

  const [offlineData, setOfflineData] = useState();

  useEffect(() => {
    fetchCrypto();
    getCache();
    getWatchList();
  }, []);

  const fetchCrypto = () => {
    dispatch(getCrypto());
  };

  const getWatchList = async () => {
    if (!watchList.length) {
      const data = await read("watchList");
      dispatch(syncWatchList(data));
    }
  };

  const getCache = () => {
    read("cryptos")
      .then(resp => {
        setOfflineData(resp);
      })
      .catch(e => {
        return null;
      });
  };

  return [loading, cryptos, message, offlineData, fetchCrypto];
};
