import { createServer } from "node:http";
import {
  createApp,
  createRouter,
  defineEventHandler,
  readBody,
  toNodeListener,
} from "h3";

const app = createApp();

const router = createRouter()
  .get(
    "/",
    defineEventHandler(() => {
      return "use another HTTP method to enable body parsing";
    }),
  )
  .post(
    "/",
    defineEventHandler(async (event) => {
      const body = await readBody(event);

      // Use can also use `readFormData` to get a FormData object, `readMultiPartFormData` to get an array of MultiPartData or `readRawBody` to get a Buffer.

      return {
        body,
      };
    }),
  );

app.use(router);

createServer(toNodeListener(app)).listen(3000);
