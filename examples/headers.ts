import { createServer } from "node:http";
import {
  createApp,
  createRouter,
  defineEventHandler,
  getRequestHeader,
  getResponseHeaders,
  setResponseHeader,
  toNodeListener,
} from "h3";

const app = createApp();

const router = createRouter().get(
  "/user-agent",
  defineEventHandler((event) => {
    const agent = getRequestHeader(event, "user-agent");
    // You can also use `getRequestHeaders` to get all headers at once.
    // const headers = getRequestHeaders(event)

    setResponseHeader(event, "content-type", "text/plain");
    setResponseHeader(event, "x-server", "nitro");
    // You can also use `setResponseHeaders` to set multiple headers at once.
    // setResponseHeaders(event, { 'x-server': 'nitro', 'content-type': 'text/plain' })

    const responseHeaders = getResponseHeaders(event);
    // You can also use `getResponseHeader` to get a single header.
    // const contentType = getResponseHeader(event, 'content-type')

    return {
      agent,
      responseHeaders,
    };
  }),
);

app.use(router);

createServer(toNodeListener(app)).listen(3000);
