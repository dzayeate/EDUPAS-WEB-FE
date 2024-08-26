import ApiService from './api.service';
import Swal from 'sweetalert2';
import router from '@/router';

// export const POST_REGISTER = "postRegister";
// export const POST_LOGIN = "postLogin";

const state = {
    isLoading: false
};

const getters = {
    isLoading: (state) => state.isLoading,
};

const actions = {
    async postRegister({ dispatch }, data) {
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
            Swal.fire({
                title: 'Error',
                text: 'Maaf, Registrasi Gagal',
                icon: 'error',
            });
        }
    },    
    async postLogin({ dispatch, commit }, params) {
        try {
            commit('SET_LOADING', true);
            
            const { data } = await ApiService.post('/auth/login', params);
            const userDetails = data.data;
            const token = userDetails.token;

            localStorage.setItem('token', token);
            // Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days            
            
            await router.push('/')
            
            return data;
        } catch (err) {
            throw err;
        } finally {
            commit('SET_LOADING', false);                        
        }
    },
};

const mutations = {
    SET_LOADING(state, status) {
        state.isLoading = status;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
