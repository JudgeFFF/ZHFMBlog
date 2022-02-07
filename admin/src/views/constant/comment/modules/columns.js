export default [
  {
    title: "评论标题",
    dataIndex: "objectId.title",
    slots: { customRender: "name" },
    width: "30%",
    ellipsis: true,
  },
  {
    title: "评论类型",
    dataIndex: "type",
    slots: { customRender: "type" },
    sorter: (a, b) => a.type.length - b.type.length,
    width: "20%",
  },
  {
    title: "评论用户",
    dataIndex: "user.username",
    width: "20%",
  },
  {
    title: "提交时间",
    dataIndex: "createdAt",
    slots: { customRender: "createdAt" },
    sorter: (a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return aTime - bTime;
    },
    width: "20%",
  },
  {
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" },
    width: "10%",
  },
];
