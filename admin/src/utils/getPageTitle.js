export default function getPageTitle(pageTitle) {
  let newTitles = [];
  newTitles.push("后台管理系统");
  newTitles.push(pageTitle);
  return newTitles.join(" - ");
}
