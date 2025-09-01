const ROUTE = "<%= name %>";

const ROUTES = {
  GET: "/",
  GET_ONE: "/:id",

  POST: "/",

  PUT: "/:id",
  PATCH: "/:id",

  DELETE: "/:id",
} as const;

export { ROUTE, ROUTES };
