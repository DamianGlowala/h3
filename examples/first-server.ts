import { createServer } from "node:http";
import { createApp, defineEventHandler, toNodeListener } from "h3"

const app = createApp();

app
  .use('/', defineEventHandler(() => {
    return "hello world"
  }))
  .use('/hello', defineEventHandler(() => {
    return "world"
  }))

// The `use` method respond to every HTTP method by default.

createServer(toNodeListener(app)).listen(3000)
