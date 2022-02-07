export default [
  {
    title: "用户文章标题",
    dataIndex: "objectId.title",
    width: "50%",
    slots: { customRender: "name" },
    ellipsis: true,
  },
  {
    title: "评分",
    dataIndex: "sRate",
    slots: { customRender: "rate" },
    sorter: (a, b) => a.sRate - b.sRate,
    width: "15%",
  },
  {
    title: "访问量",
    dataIndex: "sView",
    sorter: (a, b) => a.sView - b.sView,
    width: "15%",
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
    width: "20%",
  },
];
