import Vue from 'vue'
import App from './App.vue'

import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA5GY-Li656fu85CuOLB-4W3Dfyy1e_aG4",
  authDomain: "midterm-3a5b6.firebaseapp.com",
  projectId: "midterm-3a5b6",
  storageBucket: "midterm-3a5b6.appspot.com",
  messagingSenderId: "908061844915",
  appId: "1:908061844915:web:eee7760a24f5196d0f17c6",
  measurementId: "G-CSDKCW9R8C"
  };

firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
