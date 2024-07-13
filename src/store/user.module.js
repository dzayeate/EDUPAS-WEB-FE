import ApiService from "./api.service";

export const GET_USER_DETAIL = "getUserDetail";
export const SET_USER_DETAIL = "setUserDetail";
export const GET_USER_EMAIL = "getUserEmail";
export const SET_USER_EMAIL = "setUserEmail";
export const POST_FORGOT = "postForgot";

const state = {
  userEmail: null,
  userDetail: null,
};

const getters = {
  userDetail(state) {
    return state.userDetail;
  },
  userEmail(state) {
    return state.userEmail;
  },
};

const actions = {
  [GET_USER_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.get("/user/getUser", params)
        .then(({ data }) => {
          const user = data.data.find((user) => user.id === params.id);
          context.commit(SET_USER_DETAIL, user);
          resolve(data);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          reject(err);
        });
    });
  },
  [GET_USER_EMAIL](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.get("/user/getUser", params)
        .then(({ data }) => {
          const user = data.data.find((user) => user.email === params.email);
          const result = user?.email || null;
          context.commit(SET_USER_EMAIL, result);
          resolve(data);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          reject(err);
        });
    });
  },
  [POST_FORGOT](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.post("/user/forgot-password", params)
        .then(async ({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  [SET_USER_DETAIL](state, data) {
    state.userDetail = data;
  },
  [SET_USER_EMAIL](state, data) {
    state.userEmail = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
