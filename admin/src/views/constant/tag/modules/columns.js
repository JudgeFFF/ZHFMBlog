export default [
  {
    title: "标签名称",
    dataIndex: "tName",
    width: "20%",
  },
  {
    title: "标签颜色",
    dataIndex: "color",
    width: "20%",
  },
  {
    title: "用户名",
    dataIndex: "user.username",
    slots: { customRender: "username" },
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
    width: "20%",
  },
  {
    title: "修改时间",
    dataIndex: "updatedAt",
    slots: { customRender: "updatedAt" },
    sorter: (a, b) => {
      const aTime = new Date(a.updatedAt).getTime();
      const bTime = new Date(b.updatedAt).getTime();
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
