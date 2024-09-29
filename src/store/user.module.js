import ApiService from './api.service';
import Swal from 'sweetalert2';
import router from '@/router';

// export const GET_USER_DETAIL = "getUserDetail";
// export const SET_USER_DETAIL = "setUserDetail";
// export const GET_USER_EMAIL = "getUserEmail";
// export const SET_USER_EMAIL = "setUserEmail";
export const POST_FORGOT = 'postForgot';

const state = {
    users: [],
    userEmail: null,
    userDetail: null,
    emailCorrected: '',
    passwordStrength: '',
    passwordConfirmed: '',
    registration: [],
    isLoading: false,
    isError: false,
};

const mutations = {
    setUsers(state, data) {
        state.users = data;
    },
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
    setLoading(state, status) {
        state.isLoading = status;
    },
    setError(state, status) {
        state.isError = status;
    },
};

const actions = {
    async getUsers({ commit }, search) {
        const keyword = search?.keyword;
        const length = search?.length || 10; // default length jika tidak disediakan
        const page = search?.page || 1; // default page jika tidak disediakan

        commit('setUsers', []); // Kosongkan data kontes sebelum memulai pencarian
        commit('setLoading', true);

        try {
            let url = `/user/getUser?length=${length}&page=${page}`;
            if (keyword) {
                url += `&search=${keyword}`;
            }
            const response = await ApiService.get(url);
            commit('setUsers', response.data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            commit('setLoading', false);
            commit('setError', true);
        } finally {
            commit('setLoading', false);
        }
    },
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
                    Swal.fire({
                        title: 'Error',
                        text: 'Maaf, Sedang Gangguan',
                        icon: 'error',
                    });
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
                `/competition/findCompetitionRegistration?search=${id}`,
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
    async submission({ commit }, data) {
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
    },
};

const getters = {
    users:(state) => state.users,
    userDetail: (state) => state.userDetail,
    userEmail:(state) => state.userEmail,
    registration:(state) => state.registration,
    isError: (state) => state.isError,
    isLoading: (state) => state.isLoading,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
