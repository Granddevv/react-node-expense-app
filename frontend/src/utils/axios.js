import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getAxios = () => {
  let axiosInstance;
  const headers = {};
  axiosInstance = axios.create({
    headers,
    timeout: 30000,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return Promise.resolve(response);
    },
    function (error) {
      alert(error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const get = (uri) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .get(baseURL + uri)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const post = (uri, data) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .post(baseURL + uri, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const put = (uri, data) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .put(baseURL + uri, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAPI = (uri) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .delete(baseURL + uri)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
