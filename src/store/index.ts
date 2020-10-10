import {createStore} from 'vuex'

interface State {
    userName: string
}

export const store = createStore({
    state(): State {
        return {
            userName: "子君",
        };
    },
    mutations: {},
    actions: {},
    modules: {},
});
