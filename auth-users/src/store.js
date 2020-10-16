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
               /* Section to update a specific user at store */
                 let userNew = state.users.find(usr => usr.id === payload.id);

                 if(payload.dependency === userNew.dependency){
                     let index = state.users.indexOf(userNew);
                     state.users[index] = payload;
                     
                     state.dependencies.forEach(dep => {
                        dep.users.forEach((usr, index) => {
                            if(payload.id === usr.id){
                                 dep.users[index] = payload;
                            }
                        });
                  });
                 }else{

                        state.dependencies.forEach(dep => {
                             if(dep.id === userNew.dependency){
                                 dep.users.splice(userNew, 1);
                             }
                        });
                         let index = state.users.indexOf(userNew);
                         state.users[index] = payload;

                        state.dependencies.forEach(dep => {
                             if(dep.id === payload.dependency){
                                dep.users.push(payload);
                             }
                        });
                 }
                 this.state.users.forEach(usr => {
                db.collection("users").get().then(us => {
                     us.forEach(doc => {
                         if(usr.id === doc.data().id){
                             db.collection("users").doc(doc.id).update(usr);
                         }
                     });
                });
            });
            this.state.dependencies.forEach(dep => {
                db.collection("dependencies").get().then(us => {
                     us.forEach(doc => {
                         if(dep.id === doc.data().id){
                             db.collection("dependencies").doc(doc.id).update(dep);
                         }
                     });
                });
            });
        },
        editDependency(state, payload){
            try{
                db.collection("dependencies").get().then(ap => {
                    ap.forEach(doc => {
                        if(doc.data().id === payload.id){
                            db.collection("dependencies").doc(doc.id).update(payload);
                        }
                    })
                });

                let depNew = state.dependencies.find(us => us.id === payload.id);
                let index = state.dependencies.indexOf(depNew);
                state.dependencies[index] = payload;

            }catch(error){
                console.log(error);
            }
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
                state.users.forEach((usr, index) => {
                        if(usr.id === payload.id){
                             state.users.splice(index, 1);
                        }
                 });
                state.dependencies.forEach(dep => {
                     if(dep.users.includes(payload)){
                        dep.users.splice(payload, 1);
                     }
                });

              


            }catch(error){
                console.log(error);
            }
        },
        deleteDependency(state, payload){
            if(payload.users.length <= 0){
               
                db.collection("dependencies").get().then(up => {
                    up.forEach(doc => {
                        if (doc.data().id === payload.id){
                             db.collection("dependencies").doc(doc.id).delete();
                        }
                    });
                });

                 state.dependencies.forEach((dep, index) => {
                        if(dep.id === payload.id){
                             state.dependencies.splice(index, 1);
                        }
                 });
                
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
         editUsers({commit}, payload){
            commit("editUsers", payload);
         },
         editDependency({commit}, payload){
            commit("editDependency", payload);
         },
          deleteDependency(state, payload){
            this.commit("deleteDependency", payload);
          },
    },
});