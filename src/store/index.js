import { createStore } from 'vuex';
import contest from './contest.module';
import user from './user.module';
import auth from './auth.module';

export default createStore({
    state() {
        return {
        // state properties
        };
    },
    mutations: {
        // mutations
    },
    actions: {
        // actions
    },
    modules: {
        contest,
        user,
        auth,
    }
});
