import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment';
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
    router,
    data: {
      currentTime: null
    },
    created() {
      this.updateTime();
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    methods: {
      updateTime() {
        this.currentTime = moment().format('h:mm:ss A');
      },
    },
    render: h => h(App)
  }).$mount('#app')