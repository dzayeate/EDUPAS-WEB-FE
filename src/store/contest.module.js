import ApiService from './api.service';

const state = {
    contests: [],
    contestDetail: null, // Tambahkan state untuk contest detail
    schedule: [],
    registered: [],
    isLoading: false,
    isLoadingSchedule: false,
    isError: false,
};

const getters = {
    contests: (state) => state.contests,
    contestDetail: (state) => state.contestDetail,
    isLoading: (state) => state.isLoading,
    isLoadingSchedule: (state) => state.isLoadingSchedule,
    isError: (state) => state.isError,
    schedule: (state) => state.schedule,
    registered: (state) => state.registered,
};

const actions = {
    async getContest({ commit }, search) {
        const keyword = search?.keyword;
        const length = search?.length || 10; // default length jika tidak disediakan
        const page = search?.page || 1; // default page jika tidak disediakan

        commit('SET_CONTESTS', []); // Kosongkan data kontes sebelum memulai pencarian
        commit('SET_LOADING', true);

        try {
            let url = `/competition/findCompetition?length=${length}&page=${page}`;
            if (keyword) {
                url += `&search=${keyword}`;
            }
            const response = await ApiService.get(url);
            commit('SET_CONTESTS', response.data.data || []);
        } catch (error) {
            console.error('Error fetching contests:', error);
            commit('SET_LOADING', false);
            commit('SET_ERROR', true);
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
            commit('SET_LOADING', false);
            commit('SET_ERROR', true);
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async getSchedule({commit}, id) {
        commit('SET_LOADING_SCHEDULE', true);
        try {
            const response = await ApiService.get(
                `/competition/findScheduleCompetition?search=${id}`,
            );
            const sortedData = response.data.data.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
            );
            commit('SET_SCHEDULE', sortedData);            
        } catch (error) {
            console.error('Error fetching options:', error);
            commit('SET_LOADING_SCHEDULE', false);
            commit('SET_ERROR', true);
        } finally {
            commit('SET_LOADING_SCHEDULE', false);
        }
    },
    async getRegistered({commit}, id) {
        commit('SET_LOADING', true);
        try {
            let url = `/competition/findCompetitionRegistration`;

            if (id) {
                url += `?search=${id}`;
            }
            const response = await ApiService.get(url);            
            commit('SET_REGISTERED', response.data.data);           
        } catch (error) {
            console.error('Error fetching options:', error);
            commit('SET_LOADING', false);
            commit('SET_ERROR', true);
        } finally {
            commit('SET_LOADING', false);
        }
    }
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
    SET_LOADING_SCHEDULE(state, status) {
        state.isLoadingSchedule = status;
    },
    SET_ERROR(state, status) {
        state.isError = status;
    },
    SET_SCHEDULE(state, contest) {
        state.schedule = contest;
    },
    SET_REGISTERED(state, registered) {
        state.registered = registered;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
