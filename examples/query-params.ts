import { createServer } from "node:http";
import { createApp, createRouter, defineEventHandler, getQuery, toNodeListener } from "h3"

const app = createApp();

const router = createRouter()
  .get('/', defineEventHandler((event) => {
    const query = getQuery(event)

    if (!query.name) {
      return 'Hello world'
    }

    return `Hello ${query.name}`
  }))

app.use(router)

createServer(toNodeListener(app)).listen(3000)
