import axios from "axios";

const request = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const productKey = import.meta.env.VITE_PRODUCT_KEY;
    const agentCode = import.meta.env.VITE_AGENT_CODE;
    const headerUser = import.meta.env.VITE_HEADER_USER;
    const headerPass = import.meta.env.VITE_HEADER_PASS;

    if (!productKey || !agentCode || !headerUser || !headerPass) {
        console.error("Missing environment variables for request headers");
    }

    if (config.data) {
      config.data = {
          ...config.data,
          HeaderUser: headerUser,
          HeaderPass: headerPass,
          AgentCode: agentCode,
          ProductKey: productKey,
      };
  }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log("Intercepter Response : " , response.data) ; 
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default request ; 