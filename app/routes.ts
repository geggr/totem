import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/totem/identification.tsx"),
    route("/totem/products", "routes/totem/products.tsx"),
    route("/totem/resume", "routes/totem/resume.tsx"),
] satisfies RouteConfig;
