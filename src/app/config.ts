interface ICONFIG {
  env: string;
  apiEndpoint: string;
}

const CONFIG: ICONFIG = {
  env: process.env.NODE_ENV || "development",
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT || "",
};

export default CONFIG;
