import Layout from "@/layout/index.vue";

export default [
  {
    path: "/",
    redirect: "/home",
    hidden: true,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/register/index"),
    meta: {
      title: "用户注册",
    },
    hidden: true,
  },
  {
    path: "/password",
    name: "password",
    component: () => import("@/views/auth/password/index"),
    meta: {
      title: "修改密码",
    },
    hidden: true,
  },
  {
    path: "/",
    name: "index",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/constant/article-admin/index"),
        meta: {
          title: "首页",
          icon: "icon-shouye",
          keepAlive: true,
        },
      },
      {
        path: "article-user",
        name: "article-user",
        component: () => import("@/views/constant/article-user/index"),
        meta: {
          title: "用户文章",
          icon: "icon-200yonghu_yonghu",
          keepAlive: false,
        },
      },
      {
        path: "collect",
        name: "collect",
        component: () => import("@/views/constant/collect/index"),
        meta: {
          title: "文章收藏",
          icon: "icon-shoucang1",
          keepAlive: false,
        },
      },
      {
        path: "message",
        name: "message",
        component: () => import("@/views/constant/message/index"),
        meta: {
          title: "留言板",
          icon: "icon-liuyan",
          keepAlive: false,
        },
      },
      {
        path: "detailed/:id&:type&:isAdmin",
        name: "detailed-id",
        component: () => import("@/views/constant/detailed/index"),
        meta: {
          title: "文章详情",
          keepAlive: false,
        },
        hidden: true,
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/auth/error/403"),
    meta: {
      title: "403",
    },
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/auth/error/404"),
    meta: {
      title: "404",
    },
    hidden: true,
  },
  {
    path: "/*",
    redirect: "/404",
    hidden: true,
  },
];
