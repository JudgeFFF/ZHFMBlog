export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard/dashboard-index",
    alwaysShow: true,
    meta: {
      title: "数据管理",
      icon: "icon-shujukanban",
    },
    children: [
      {
        path: "dashboard-index",
        name: "dashboard-index",
        component: () => import("@/views/async/dashboard/index"),
        meta: {
          title: "数据板",
        },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/layout/index.vue"),
    redirect: "/user/user-index",
    alwaysShow: true,
    meta: {
      title: "用户管理",
      icon: "icon-yonghuguanli_huaban",
    },
    children: [
      {
        path: "user-index",
        name: "user-index",
        component: () => import("@/views/async/user/index"),
        meta: {
          title: "用户列表",
        },
      },
    ],
  },
  {
    path: "/region",
    name: "region",
    component: () => import("@/layout/index.vue"),
    redirect: "/region/region-index",
    alwaysShow: true,
    meta: {
      title: "地区管理",
      icon: "icon-diquguanli",
    },
    children: [
      {
        path: "region-index",
        name: "region-index",
        component: () => import("@/views/async/region/index"),
        meta: {
          title: "地区列表",
        },
      },
    ],
  },
];
