export default [
  {
    title: "用户名",
    dataIndex: "username",
    width: "25%",
  },
  {
    title: "用户权限",
    dataIndex: "isAdmin",
    slots: { customRender: "isAdmin" },
    sorter: (a, b) => a.isAdmin - b.isAdmin,
    width: "25%",
  },
  {
    title: "注册时间",
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
    width: "10%",
    slots: { customRender: "action" },
  },
];
