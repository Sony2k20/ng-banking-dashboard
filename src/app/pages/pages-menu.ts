import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "shopping-cart-outline",
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "IoT Dashboard",
    icon: "home-outline",
    link: "/pages/iot-dashboard",
  },
  {
    title: "FEATURES",
    group: true,
  },
  {
    title: "Charts",
    icon: "pie-chart-outline",
    children: [
      {
        title: "Echarts",
        link: "/pages/charts/echarts",
      },
      {
        title: "Charts.js",
        link: "/pages/charts/chartjs",
      },
      {
        title: "D3",
        link: "/pages/charts/d3",
      },
    ],
  },
];
