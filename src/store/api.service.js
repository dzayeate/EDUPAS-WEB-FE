import axios from "axios";
import JwtService from "./jwt.service";
import config from "@/ConfigProvider";
// import axiosCookieJarSupport from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const ApiService = {
  api: null,

  init() {
    this.api = axios.create({
      baseURL: config.value("EDUPAS_API_URL"),
    });

    this.setHeader();
  },

  setHeader() {
    const token = JwtService.getToken();
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },

  query(resource, params) {
    return this.api.get(resource, params);
    // .catch((error) => {
    //   throw new Error(`ApiService ${error}`);
    // });
  },

  async get(resource, params) {
    if (params && params.session) {
    //   axiosCookieJarSupport(this.api);
      const cookieJar = new CookieJar();
      return this.api.get(`${resource}`, {
        jar: cookieJar,
        // withCredentials: true,
        params,
      });
      // .catch((error) => {
      //   throw new Error(`ApiService ${error}`);
      // });
    } else {
      return this.api.get(`${resource}`, { params });
      // .catch((error) => {
      //   const err = new Error(`ApiService ${error}`);
      //   err.code = error.response.status;
      //   throw err;
      // });
    }
  },

  post(resource, params) {
    return this.api.post(`${resource}`, params);
  },

  upload(resource, params) {
    let formData = new FormData();
    formData.append("file", params);
    return this.api.post(`${resource}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(resource, slug, params) {
    return this.api.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return this.api.put(`${resource}`, params);
  },

  patch(resource, params) {
    return this.api.patch(`${resource}`, params);
  },

  delete(resource) {
    return this.api.delete(resource).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
