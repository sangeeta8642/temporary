import { handle } from "hono/vercel";
import { Hono } from "hono";

import images from "./images";
import ai from "./ai";
import users from "./users";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
  .route("/images", images)
  .route("/ai", ai)
  .route("/users", users);

export type AppType = typeof routes;
export const GET = handle(app);
export const POST = handle(app);
