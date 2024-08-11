import Cookies from 'js-cookie';
import ApiService from './api.service';
import Swal from 'sweetalert2';
import router from '@/router';

// export const POST_REGISTER = "postRegister";
// export const POST_LOGIN = "postLogin";

const state = {};

const getters = {};

const actions = {
    async postRegister({dispatch}, data) {
        try {
            await ApiService.post('/auth/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                title: 'Created',
                text: 'Registrasi Anda Berhasil.',
                icon: 'success',
            }).then(() => {
                router.push('/login');
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Maaf, Registrasi Gagal',
                icon: 'error',
            });
        }
    },
    postLogin({ dispatch }, params) {
        return new Promise((resolve, reject) => {
            ApiService.post('/auth/login', params)
                .then(async ({ data }) => {
                    const userDetails = data.data;
                    const token = userDetails.token;

                    Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days

                    window.location.href = '/';

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
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
