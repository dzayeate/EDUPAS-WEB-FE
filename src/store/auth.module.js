import ApiService from "./api.service";

export const POST_REGISTER = "postRegister";
export const POST_LOGIN = "postLogin";

const state = {};

const getters = {};

const actions = {
  [POST_REGISTER](context, params) {
    const newParams = {
      email: params.email,
      password: params.password,
      confirmPassword: params.confirmPassword,
      roleName: params.roleName,
    };
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/register", newParams, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(async ({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [POST_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/login", params)
        .then(async ({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
