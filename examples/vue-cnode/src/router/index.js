import Vue from 'vue'
import Router from 'vue-router'

// router code split
const WelcomePage = () => import('@/components/welcome-page')
const HomePage = () => import('@/views/index.vue')
const ListPage = () => import('@/views/list.vue')
const TopicPage = () => import('@/views/topic.vue')
const NewPage = () => import('@/views/new.vue')
const MessagePage = () => import('@/views/message.vue')
const UserPage = () => import('@/views/user.vue')
const AboutPage = () => import('@/views/about.vue')
const LoginPage = () => import('@/views/login.vue')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Welcome',
    //   component: WelcomePage,
    //   meta: { auth: true }
    // },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/list',
      name: 'ListPage',
      component: ListPage,
    },
    {
      path: '/topic',
      name: 'topic',
      component: TopicPage,
    },
    {
      path: '/new',
      name: 'NewPage',
      component: NewPage,
    },
    {
      path: '/message',
      name: 'MessagePage',
      component: MessagePage,
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
  ]
})
