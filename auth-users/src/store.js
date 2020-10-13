import Vue from "vue";
import Vuex from "vuex";
import {db} from "./main"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        dependencies: [],
    },
    mutations: {
        addToUsers(state,payload){
            try{
                state.users.push(payload);
                db.collection('users').add(payload);
              // const snapshot = await db.collection('users').get();
    
               // snapshot.forEach(user => {
               //     console.log(user.data());
               //})
            }catch(error){
                console.log(error);
            }
        },
        addToDependencies(state,payload){
            try{
                state.dependencies.push(payload);
                db.collection('dependencies').add(payload);
            }catch(error){
                console.log(error);
            }
        },
    },
    actions: {
         addToUsers({commit}, payload){
            commit("addToUsers", payload);
         },
         addToDependencies({commit}, payload){
            commit("addToDependencies", payload);
         }
    },
});