import { createServer } from "node:http";
import {
  createApp,
  createRouter,
  defineEventHandler,
  toNodeListener,
} from "h3";

const app = createApp();

const router = createRouter()
  .get(
    "/",
    defineEventHandler(() => {
      return "GET: hello world";
    }),
  )
  .post(
    "/",
    defineEventHandler(() => {
      return "POST: hello world";
    }),
  )
  .put(
    "/",
    defineEventHandler(() => {
      return "PUT: hello world";
    }),
  )
  .delete(
    "/",
    defineEventHandler(() => {
      return "DELETE: hello world";
    }),
  )
  .patch(
    "/",
    defineEventHandler(() => {
      return "PATCH: hello world";
    }),
  )
  .head(
    "/",
    defineEventHandler(() => {
      return "HEAD: hello world";
    }),
  );

app.use(router);

createServer(toNodeListener(app)).listen(3000);
