import axios from "axios";

const baseURL =
  "https://data.messari.io/api/v1/assets?fields=id,symbol,name,symbol,metrics";

const _axios = axios.create({
  baseURL,
  timeout: 3000,
});

_axios.defaults.timeout = 3000;
export default _axios;
