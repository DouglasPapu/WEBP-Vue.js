import Vue from "vue";
import Vuex from "vuex";
import {db} from "./main"
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        dependencies: [],
    },
    mutations: {
        addToUsers(state,payload){
            try{
                payload.id=((state.users.length) - 1) + 1; //cambiarlo
                state.users.push(payload);
                db.collection('users').add(payload);

                //Agrega el usuario a la lista de usuarios de la dependencia correspondiente. En el store.
                state.dependencies.forEach(dep => {
                    if(dep.id === payload.dependency){
                        dep.users.push(payload);
                    }
                });
                //Agrega el usuario a la lista de usuarios de la dependencia correspondiente. En firebase.
                db.collection("dependencies").get().then((dep) => {
                    dep.forEach(doc => {
                        if(doc.data().id === payload.dependency){
                            db.collection("dependencies").doc(doc.id).update({
                                users: firebase.firestore.FieldValue.arrayUnion(payload)
                            });
                        }
                    })
                 });   

            }catch(error){
                console.log(error);
            }
        },
        addToDependencies(state,payload){
            try{
                payload.id=((state.dependencies.length) - 1) + 1;
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