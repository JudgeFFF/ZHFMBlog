export default [
  {
    title: "文章地区",
    dataIndex: "rName",
    width: "30%",
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
    width: "30%",
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
    width: "30%",
  },
  {
    title: "操作",
    dataIndex: "action",
    width: "10%",
    slots: { customRender: "action" },
  },
];
