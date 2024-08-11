// store/modules/options.js

const state = {
    optionsProvincies: [],
    optionsRegencies: [],
};

const mutations = {
    SET_OPTIONS_PROVINCIES(state, optionsProvincies) {
        state.optionsProvincies = optionsProvincies;
    },
    SET_OPTIONS_REGENCIES(state, optionsRegencies) {
        state.optionsRegencies = optionsRegencies;
    },
};

const getters = {
    optionsProvincies: (state) => state.optionsProvincies,
    optionsRegencies: (state) => state.optionsRegencies,
};

const actions = {
    async fetchOptionsProvincies({ commit }) {
        try {
            const response = await fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`,
            );
            const data = await response.json();
            // const names = data.map((item) => item.name);            
            commit('SET_OPTIONS_PROVINCIES', data);            
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    },
    async fetchOptionsRegencies({ commit }, search) {
        try {
            const response = await fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${search}.json`,
            );
            const data = await response.json();
            const names = data.map((item) => item.name);                    
            commit('SET_OPTIONS_REGENCIES', names);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
