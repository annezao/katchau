/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Settings from "views/Settings/Settings.jsx";
import Divices from "./views/Devices/Devices";

var routes = [
  {
    path: "/devices",
    name: "Dispositivos",
    icon: "tim-icons icon-mobile",
    component: Divices,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Perfil do usário",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Configurações",
    icon: "tim-icons icon-settings-gear-63",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/dashboard/:id",
    name: "Painel de controle",
    icon: "tim-icons icon-settings-gear-63",
    component: Dashboard,
    invisible: true,
    layout: "/admin"
  },
];

export default routes;