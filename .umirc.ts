import { defineConfig } from '@umijs/max';
export default defineConfig({
  vite: {},

  // antd配置
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: false,
  },

  //权限  access 插件依赖 initial State 所以需要同时开启
  access: {},

  proxy: {
    '/api': {
      target: 'http://192.168.68.175:8888/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  model: {},

  initialState: {},

  // 请求过来的数据字段
  request: {
    dataField: '',
  },

  layout: {},
  routes: [
    /** 数据总览 */
    {
      path: '/',
      name: '数据总览',
      component: '@/pages/Home',
      icon: 'DatabaseTwoTone',
      // 配置子路由
      routes: [],
    },

    /** 用户管理 */
    {
      name: '用户管理',
      path: '/user',
      icon: 'ContactsTwoTone',
      // 配置子路由
      routes: [
        {
          name: '代理列表',
          path: '/user/agents',
          component: '@/pages/User/ProxyOfList',
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
        {
          name: '管理员列表',
          path: '/user/admins/*',
          component: '@/pages/User/AdminsList',
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
        {
          name: '修改管理员',
          path: '/user/edit/update/*',
          component: '@/pages/User/UpdateAdmin',
          hideInMenu: true,
        },
        {
          name: '新增管理员',
          path: '/user/edit/add',
          component: '@/pages/User/Edit/AddAdmin',
          hideInMenu: true,
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
        {
          name: '用户列表',
          path: '/user/users',
          component: '@/pages/User/UsersList',
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
      ],
    },

    /** 订单管理 */
    {
      name: '订单管理',
      path: '/order',
      icon: 'GiftTwoTone',
      // 配置子路由
      routes: [
        {
          name: '订单列表',
          path: '/order/orders',
          component: '@/pages/Order/OrderLit',
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
        {
          name: '资金走向列表',
          path: '/order/capitaltrend',
          component: '@/pages/Order/CapitalTrend',
          /** 在面包屑中隐藏 */
          hideInBreadcrumb: true,
        },
        {
          name: '取消订单配置',
          path: '/order/cancelset',
        },
        {
          name: '小费选择配置',
          path: 'order/feeset',
        },
      ],
    },

    /** 骑手管理 */
    {
      name: '骑手管理',
      path: '/rider',
      icon: 'CarTwoTone',
      // 配置子路由
      routes: [
        {
          name: '骑手列表',
          path: '/rider/riders',
        },
        {
          name: '骑手审核列表',
          path: 'rider/registers',
        },
      ],
    },

    /** 城市管理 */
    {
      name: '城市管理',
      path: '/city',
      icon: 'GoldTwoTone',
      // 配置子路由
      routes: [
        {
          name: '运营城市列表',
          path: '/city/citys',
        },
      ],
    },

    /** 运营管理 */
    {
      name: '运营管理',
      path: '/city/valuation',
      icon: 'FunnelPlotTwoTone',
      // 配置子路由
      routes: [
        {
          name: '计价规则',
          path: '/city/valuation/valuations',
        },
        {
          name: '重量标签',
          path: '/city/valuation/weight',
        },
        {
          name: '物品标签组',
          path: '/city/valuation/tag',
        },
      ],
    },

    /** 优惠券管理 */
    {
      name: '优惠券管理',
      path: '/coupon',
      icon: 'RedEnvelopeTwoTone',
      // 配置子路由
      routes: [
        {
          name: '优惠券列表',
          path: '/coupon/coupons',
        },
        {
          name: '优惠券设置',
          path: '/coupon/setting',
        },
      ],
    },

    /** 提现管理 */
    {
      name: '提现管理',
      path: '/payouts',
      icon: 'SmileTwoTone',
      // 配置子路由
      routes: [
        {
          name: '提现列表',
          path: '/payouts/cash',
        },
        {
          name: '提现设置',
          path: '/payouts/config',
        },
      ],
    },
    /** 系统设置 */
    {
      name: '系统设置',
      path: '/config',
      icon: 'SettingTwoTone',
      // 配置子路由
      routes: [
        {
          name: '小程序设置',
          path: '/config/app',
        },
        {
          name: '分享设置',
          path: '/config/share',
        },
        {
          name: '积分设置',
          path: '/config/integral',
        },
        {
          name: '订阅消息设置',
          path: '/config/wxsubscribe',
        },
        {
          name: '用户指南',
          path: '/config/user',
        },
        {
          name: '骑手指南',
          path: '/config/rider',
        },
        {
          name: '骑手协议',
          path: '/config/agreementRider',
        },
      ],
    },

    {
      name: '个人信息设置',
      path: '/personal/update',
      component: '@/pages/PersonalSetting',
      hideInMenu: true,
    },
    {
      name: '修改密码',
      path: '/personal/updatePwd',
      component: '@/pages/UpdatePersonalPwd',
      hideInMenu: true,
    },

    {
      name: 'CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
      /** 在面包屑中隐藏 */
      hideInBreadcrumb: false,
    },
    {
      name: '新增代理',
      path: '/addProxy',
      component: '@/pages/AddProxy',
      hideInMenu: true,
    },
    {
      name: '修改代理',
      path: '/agent/edit/update/*',
      component: '@/pages/User/Agent/Edit/UpdateEdit',
      hideInMenu: true,
    },

    {
      name: '登录页',
      path: '/authorization',
      component: '@/pages/Authorization/index',
      layout: false,
      hideInMenu: true,
    },
    {
      name: '登录页',
      path: '/auth',
      component: '@/pages/Auth/index',
      hideInMenu: true,
      layout: false,
    },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
});
