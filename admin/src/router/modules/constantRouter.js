import Layout from "@/layout/index.vue";

export default [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/login/index"),
    meta: {
      title: "登录",
    },
    hidden: true,
  },
  {
    path: "/workspace",
    name: "workspace",
    component: Layout,
    redirect: "/workspace/workspace-index",
    alwaysShow: true,
    meta: {
      title: "工作空间",
      icon: "icon-gongzuotai",
    },
    children: [
      {
        path: "workspace-index",
        name: "workspace-index",
        component: () => import("@/views/constant/workspace/index"),
        meta: {
          title: "工作台",
        },
      },
    ],
  },
  {
    path: "/article",
    name: "article",
    component: Layout,
    redirect: "/article/article-index",
    alwaysShow: true,
    meta: {
      title: "文章管理",
      icon: "icon-wenzhang1",
    },
    children: [
      {
        path: "article-index",
        name: "article-index",
        component: () => import("@/views/constant/article/index"),
        meta: {
          title: "文章列表",
        },
      },
      {
        path: "article-edit",
        name: "article-edit",
        component: () => import("@/views/constant/article/edit"),
        meta: {
          title: "文章编辑",
        },
      },
    ],
  },
  {
    path: "/tag",
    name: "tag",
    component: Layout,
    redirect: "/tag/tag-index",
    alwaysShow: true,
    meta: {
      title: "标签管理",
      icon: "icon-biaoqian",
    },
    children: [
      {
        path: "tag-index",
        name: "tag-index",
        component: () => import("@/views/constant/tag/index"),
        meta: {
          title: "标签列表",
        },
      },
    ],
  },
  {
    path: "/comment",
    name: "comment",
    component: Layout,
    redirect: "/comment/comment-index",
    alwaysShow: true,
    meta: {
      title: "评论管理",
      icon: "icon-pinglun2",
    },
    children: [
      {
        path: "comment-index",
        name: "comment-index",
        component: () => import("@/views/constant/comment/index"),
        meta: {
          title: "评论列表",
        },
      },
    ],
  },
  {
    path: "/message",
    name: "message",
    component: Layout,
    redirect: "/message/message-index",
    alwaysShow: true,
    meta: {
      title: "留言管理",
      icon: "icon-liuyan",
    },
    children: [
      {
        path: "message-index",
        name: "message-index",
        component: () => import("@/views/constant/message/index"),
        meta: {
          title: "留言列表",
        },
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
