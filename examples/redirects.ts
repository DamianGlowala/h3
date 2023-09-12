import { createServer } from "node:http";
import { createApp, createRouter, defineEventHandler, sendRedirect, toNodeListener } from "h3"

const app = createApp();

const router = createRouter()
  .get('/unjs', defineEventHandler((event) => {
    return sendRedirect(event, 'https://unjs.io/packages/h3') // 302 Found by default
  }))
  .get('/permanent', defineEventHandler((event) => {
    // You can use any 3xx status code you want
    return sendRedirect(event, 'https://unjs.io/packages/h3', 301)
  }))

app.use(router)

createServer(toNodeListener(app)).listen(3000)
