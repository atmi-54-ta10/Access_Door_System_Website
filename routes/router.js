import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Controlling from '@/components/Controlling'
import Monitoring from '@/components/Monitoring'

Vue.use(Router)

export default new Router({
 routes: [
      {
        path: '/landing',
        name: 'Landing',
        component: Landing
      },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/controlling',
      name: 'Controlling',
      component: Controlling
    },
    {
      path: '/monitoring',
      name: 'Monitoring',
      component: Monitoring
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/editdata',
      name: 'User Data',
      component: UserData
    },
    {
      path: '/userdata',
      name: 'User Data',
      component: UserData
    },
    {
      path: '/datalog',
      name: 'Datalog',
      component: Datalog
    },
    {
      path: '/settingadmin',
      name: 'Setting Admin',
      component: SettingAdmin
    },
    {
      path: '/temperature',
      name: 'Temperature',
      component: Temperature
    }
 ]
})