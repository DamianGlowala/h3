import { createServer } from "node:http";
import {
  createApp,
  createRouter,
  defineEventHandler,
  getCookie,
  setCookie,
  toNodeListener,
} from "h3";

const app = createApp();

const router = createRouter()
  .get(
    "/",
    defineEventHandler((event) => {
      const sessionId = getCookie(event, "sessionId");

      return {
        sessionId,
      };
    }),
  )
  .post(
    "/login",
    defineEventHandler((event) => {
      setCookie(event, "sessionId", "bar", { httpOnly: true }); // By default, path is set to `/`. You can use any of the options supported by the Set-Cookie header.
      // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

      return "logged in";
    }),
  );

app.use(router);

createServer(toNodeListener(app)).listen(3000);
