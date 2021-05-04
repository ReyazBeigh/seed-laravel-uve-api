
import { post } from 'request';
import Vue from 'vue'
import store from '../store'

export default {
    login(user) {
        return Vue.axios.post("/api/login", user)
            .then((response) => {
                store.commit("SET_USER_DATA", response.data);
            })
    },
    getUser(){
        return Vue.axios.get("/api/user")
    },


}
