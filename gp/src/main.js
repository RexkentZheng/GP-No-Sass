// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Upload,Button,Pagination,Message} from 'element-ui'
import _ from 'lodash'

Vue.component(Upload.name, Upload)
Vue.component(Button.name, Button)
Vue.component(Pagination.name, Pagination)
Vue.component(Message.name, Message)
Vue.config.productionTip = false

Vue.prototype.$message = Message;
Vue.prototype._ = _;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
