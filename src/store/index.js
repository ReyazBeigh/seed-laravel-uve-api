import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
    state: {
        user: null,
    },
    mutations: {
        UNSET_USER_DATA() {
            //state.user=null;
            localStorage.removeItem("user");
            /*axios.defaults.headers.common[
              "Authorization"
            ] = null;
            */
            location.reload()
        },
        SET_USER_DATA(state, data) {
            state.user = data.user;
            localStorage.setItem('user', JSON.stringify(data))
            Vue.axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.token}`
        },
    },
    actions: {
        logout({ commit }) {
            commit("UNSET_USER_DATA");
        },
        register({ commit }, user) {

            return this.$axios
                .post("//localhost:8001/mock.php?request=register", user)
                .then((response) => {
                    commit("SET_USER_DATA", response.data);
                })
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.user //!! returs truthfullness of the statement
        },
        user(state) {
            return state.user
        }
    },
    modules: {},
}
export default new Vuex.Store(store)
