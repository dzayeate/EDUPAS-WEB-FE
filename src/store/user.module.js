import { log } from 'util';
import ApiService from './api.service';
import Swal from 'sweetalert2';
import router from '@/router';

// export const GET_USER_DETAIL = "getUserDetail";
// export const SET_USER_DETAIL = "setUserDetail";
// export const GET_USER_EMAIL = "getUserEmail";
// export const SET_USER_EMAIL = "setUserEmail";
export const POST_FORGOT = 'postForgot';

const state = {
    userEmail: null,
    userDetail: null,
    emailCorrected: '',
    passwordStrength: '',
    passwordConfirmed: '',
    registration: []
};

const mutations = {
    setUserDetails(state, data) {
        state.userDetail = data;
    },
    setUserEmail(state, data) {
        state.userEmail = data;
    },
    setRegistration(state, data) {
        state.registration = data;
    },
    setEmailCorrected(state, data) {
        state.emailCorrected = data;
    },
    setPasswordStrength(state, data) {
        state.passwordStrength = data;
    },
    setPasswordConfirmed(state, data) {
        state.passwordConfirmed = data;
    },
};

const actions = {
    //   getUserDetail({ commit }, params) {
    //     return new Promise((resolve, reject) => {
    //       ApiService.get("/user/getUser", params)
    //         .then(async ({ data }) => {
    //           const user = data.data[0];
    //           await commit("setUserDetails", user);
    //           resolve(data);
    //         })
    //         .catch((err) => {
    //           console.error("Error fetching users:", err);
    //           reject(err);
    //         });
    //     });
    //   },
    async getUserDetail({ commit }, params) {
        try {
            const response = await ApiService.get('/user/getUser', params);
            commit('setUserDetails', response.data.data[0]);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    },
    getUserEmail({ commit }, params) {
        return new Promise((resolve, reject) => {
            ApiService.get('/user/getUser', params)
                .then(({ data }) => {
                    const user = data.data[0];
                    const result = user?.email || null;
                    commit('setUserEmail', result);
                    resolve(data);
                })
                .catch((err) => {
                    console.error('Error fetching users:', err);
                    reject(err);
                });
        });
    },
    async updateBiodate({ dispatch }, data) {
        const id = data.id;
        const formData = data.data;
        try {
            await ApiService.put(`/user/update-biodate?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                title: 'Updated',
                text: 'Perubahan Berhasil disimpan',
                icon: 'success',
                showConfirmButton: false,
                timer: 700,
            }).then(() => {
                router.push('/profile');
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Maaf, Perubahan Gagal disimpan',
                icon: 'error',
            });
        }
    },
    async updateRole({ dispatch }, data) {
        try {
            await ApiService.post(`/user/change-role`, data);
        } catch (error) {
            console.error('Error:', error);
        }
    },
    [POST_FORGOT](context, params) {
        return new Promise((resolve, reject) => {
            ApiService.post('/user/forgot-password', params)
                .then(async ({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    async registerCompetition({ dispatch }, data) {
        try {
            await ApiService.post('/competition/register/peserta', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                title: 'Sukses',
                text: 'Registrasi Kompetisi Anda Berhasil.',
                icon: 'success',
                showConfirmButton: false,
                timer: 800,
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Maaf, Registrasi Kompetisi Gagal',
                icon: 'error',
            });
        }
    },
    async getRegistration({ commit }, id) {        
        try {
            const response = await ApiService.get(
                `/competition/findCompetitionRegistration?search=${id}`
            );
            const extractedData = response.data.data.map((item) => ({
                id: item.id,
                competitionId: item.competitionId,
            }));
            commit('setRegistration', extractedData);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    },
    async submission({commit}, data) {
        try {
            await ApiService.post('/competition/submission', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                title: 'Sukses',
                text: 'Unggah Berkas Berhasil.',
                icon: 'success',
                showConfirmButton: false,
                timer: 800,
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Maaf, Unggah Berkas Gagal',
                icon: 'error',
            });
        }
    }
};

const getters = {
    userDetail(state) {
        return state.userDetail;
    },
    userEmail(state) {
        return state.userEmail;
    },
    registration(state) {
        return state.registration;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
