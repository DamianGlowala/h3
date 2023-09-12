import { createServer } from "node:http";
import {
  createApp,
  createRouter,
  defineEventHandler,
  defineRequestMiddleware,
  defineResponseMiddleware,
  toNodeListener,
} from "h3";

// const app = createApp()

// const router = createRouter()
//   .get('/', defineEventHandler({
//     onRequest: defineRequestMiddleware(() => {
//       // Do anything you want here like authentication, rate limiting, etc.
//       console.log('onRequest')
//       // Never return anything from onRequest to avoid to close the connection
//     }),
//     handler: defineEventHandler(() => {
//       return "GET: hello world"
//     }),
//     onBeforeResponse: defineResponseMiddleware(() => {
//       // Do anything you want here like logging, collecting metrics, or output compression, etc.
//       console.log('onResponse')
//       // Never return anything from onResponse to avoid to close the connection
//     })
//   }))

// app.use(router)

// createServer(toNodeListener(app)).listen(3000)

const app = createApp();

const router = createRouter().get(
  "/",
  defineEventHandler({
    onRequest: defineRequestMiddleware(() => {
      console.log("onRequest");
    }),
    handler: defineEventHandler(() => {
      return "GET: hello world";
    }),
    onBeforeResponse: defineResponseMiddleware(() => {
      console.log("onResponse");
    }),
  }),
);

app.use(router);

createServer(toNodeListener(app)).listen(3000);
