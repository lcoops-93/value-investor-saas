const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/company/:ticker"],
    exact: true,
    component: "Company",
  },
];

export default routes;
