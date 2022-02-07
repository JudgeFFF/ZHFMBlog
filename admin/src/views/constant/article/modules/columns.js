export default [
  {
    title: "文章标题",
    dataIndex: "title",
    slots: { customRender: "name" },
    width: "20%",
    ellipsis: true,
  },
  {
    title: "文章地区",
    dataIndex: "region.rName",
    width: "10%",
  },
  {
    title: "文章标签",
    dataIndex: "tag",
    slots: { customRender: "tag" },
    width: "15%",
    ellipsis: true,
  },
  {
    title: "收藏量",
    dataIndex: "statistic.sCollect",
    slots: { customRender: "collect" },
    sorter: (a, b) => a.statistic.sCollect - b.statistic.sCollect,
    width: "10%",
  },
  {
    title: "访问量",
    dataIndex: "statistic.sView",
    sorter: (a, b) => a.statistic.sView - b.statistic.sView,
    width: "10%",
  },
  {
    title: "发布时间",
    dataIndex: "createdAt",
    slots: { customRender: "createdAt" },
    sorter: (a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return aTime - bTime;
    },
    width: "10%",
  },
  {
    title: "用户名",
    dataIndex: "user.username",
    slots: { customRender: "username" },
    width: "10%",
  },
  {
    title: "操作",
    dataIndex: "action",
    width: "15%",
    slots: { customRender: "action" },
  },
];
