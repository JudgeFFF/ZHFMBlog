export default function getPageTitle(pageTitle) {
  let newTitles = [];
  newTitles.push("珠海市美食博客");
  newTitles.push(pageTitle);
  return newTitles.join(" - ");
}
