export default [
  {
    title: "留言用户",
    dataIndex: "user.username",
    width: "45%",
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
    width: "45%",
  },
  {
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" },
    width: "10%",
  },
];
