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
        editUsers(state, payload){
            db.collection("users").get().then(usr => {
                usr.forEach(doc => {
                    if(doc.data().id === payload.id){
                        db.collection("users").doc(doc.id).update(payload);
                        }
                  });
            });
            /* Section to update dependecies with the same user*/
            db.collection("dependencies").get().then(dep => {
                    dep.forEach(doc => {
                        doc.data().users.forEach(usr => {
                            if(usr.id === payload.id){
                              db.collection("dependencies").doc(doc.id) //Falta completar
                          }
                        });                       
                    });
                });

               /* Section to update a specific user at store */
                 let userNew = state.users.find(usr => usr.id === payload.id);
                 let index = state.users.indexOf(userNew);
                 state.users[index] = payload;

                 state.dependencies.forEach(dep => {
                     if(dep.users.includes(payload)){
                        let userNewTwo = dep.users.find(usr => usr.id === payload.id);
                        let index = dep.users.indexOf(userNewTwo);
                        dep.users[index] = payload;
                     }
                });


        },
        deleteUsers(state, payload){
            try{
                /* Code that delete a user from firebase */
                db.collection("users").get().then(usr => {
                    usr.forEach(doc => {
                    if(doc.data().id === payload.id){
                        db.collection("users").doc(doc.id).delete();
                        }
                  });
                });


                  /* Searching dependencies with linked users to remove him */
                  db.collection("dependencies").get().then(dep => {
                    dep.forEach(doc => {
                        doc.data().users.forEach(usr => {
                            if(usr.id === payload.id){
                                  db.collection("dependencies").doc(doc.id).update({
                                      users: firebase.firestore.FieldValue.arrayRemove(payload)
                                  });               
                           }
                        });                       
                    });
                });
                /* Methods delete a specific user and remove him from all linked dependecies */
                state.users.splice(payload,1);
                state.dependencies.forEach(dep => {
                     if(dep.users.includes(payload)){
                        dep.users.splice(payload, 1);
                     }
                });

              


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
         },
         deleteUsers({commit}, payload){
            commit("deleteUsers", payload);
         },
    },
});