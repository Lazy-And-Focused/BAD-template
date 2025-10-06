const ROUTE = "<%= name %>";

const ROUTES = {
  GET: "/:method",
  GET_CALLBACK: "/:method/callback",
} as const;

export { ROUTE, ROUTES };
