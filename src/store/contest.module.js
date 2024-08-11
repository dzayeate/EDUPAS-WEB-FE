import ApiService from './api.service';

const state = {
    contests: [],
    contestDetail: null, // Tambahkan state untuk contest detail
    isLoading: false
};

const getters = {
    contests: (state) => state.contests,
    contestDetail: (state) => state.contestDetail,
    isLoading: (state) => state.isLoading,
};

const actions = {
    async getContest({ commit }, search) {
        commit('SET_LOADING', true);
        try {
            if (!search) {
                const response = await ApiService.get(
                    '/competition/findCompetition',
                );
                commit('SET_CONTESTS', response.data.data);
            } else {
                response = await ApiService.get(
                    `/competition/findCompetition?search=${search}`,
                );
                commit('SET_CONTESTS', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async getContestDetail({ commit }, slug) {
        commit('SET_LOADING', true);
        // Tambahkan action untuk mengambil contest detail
        try {
            const response = await ApiService.get(
                `/competition/findCompetition?search=${slug}`,
            );
            // const names = data.map((item) => item.name);
            commit('SET_CONTEST_DETAIL', response.data.data[0]);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },
};

const mutations = {
    SET_CONTESTS(state, contests) {
        state.contests = contests;
    },
    SET_CONTEST_DETAIL(state, contest) {
        // Tambahkan mutation untuk mengatur contest detail
        state.contestDetail = contest;
    },
    SET_LOADING(state, status) {
        state.isLoading = status;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
