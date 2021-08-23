import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        counter: 0

    },
    mutations: {
        ADD_TASK: function (state) {

            state.counter++;
            

        },
        DELETE_TASK: function (state) {

            state.counter--;
            
        },
    }

})