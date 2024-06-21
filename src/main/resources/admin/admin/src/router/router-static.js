import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import xuesheng from '@/views/modules/xuesheng/list'
    import xinxicaiji from '@/views/modules/xinxicaiji/list'
    import wenjuandiaocha from '@/views/modules/wenjuandiaocha/list'
    import wenjuanfenlei from '@/views/modules/wenjuanfenlei/list'
    import yiqingwenjuan from '@/views/modules/yiqingwenjuan/list'
    import jiaoshi from '@/views/modules/jiaoshi/list'
    import fanxiaoxinxi from '@/views/modules/fanxiaoxinxi/list'
    import fanxiaoqingkuang from '@/views/modules/fanxiaoqingkuang/list'
    import shujucaiji from '@/views/modules/shujucaiji/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/xuesheng',
        name: '学生',
        component: xuesheng
      }
      ,{
	path: '/xinxicaiji',
        name: '信息采集',
        component: xinxicaiji
      }
      ,{
	path: '/wenjuandiaocha',
        name: '问卷调查',
        component: wenjuandiaocha
      }
      ,{
	path: '/wenjuanfenlei',
        name: '问卷分类',
        component: wenjuanfenlei
      }
      ,{
	path: '/yiqingwenjuan',
        name: '疫情问卷',
        component: yiqingwenjuan
      }
      ,{
	path: '/jiaoshi',
        name: '教师',
        component: jiaoshi
      }
      ,{
	path: '/fanxiaoxinxi',
        name: '返校信息',
        component: fanxiaoxinxi
      }
      ,{
	path: '/fanxiaoqingkuang',
        name: '返校情况',
        component: fanxiaoqingkuang
      }
      ,{
	path: '/shujucaiji',
        name: '数据采集',
        component: shujucaiji
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
