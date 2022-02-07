export default function removeToken() {
  localStorage.removeItem("elementTokenAdmin");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("username");
  localStorage.removeItem("isAdminLoc");
}
