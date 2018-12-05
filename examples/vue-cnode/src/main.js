import VueHead from 'vue-head';
import App from './App';
import store from './store';
import router from './router';
import { hasAccessRight } from './apis/index';

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode
Vue.use(VueHead);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  // created: function () {
  //   hasAccessRight().then(ret => {
  //     if (ret != 'true') {
  //       this.$router.push('/no-right');
  //     }
  //   });
  // }
});
// router.beforeEach((to, from, next) => {
//   if (!to) { return };
//   if (to.matched.some(m => m.meta.auth)) {
//     hasAccessRight().then(ret => {
//       if (ret != 'true') {
//         router.push('/no-right');
//       } else {
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// })
