import { createServer } from "node:http";
import { createApp, createError, createRouter, defineEventHandler, toNodeListener } from "h3"

const app = createApp();

const router = createRouter()
  .get('/', defineEventHandler(() => {
    // Do not forget to return the error
    return createError('A simple error') // Create a 500 Internal Server Error by default
  }))
  .get('/complexe-error', defineEventHandler(() => {
    // You can fully customize errors by adding data, cause and if it's a fatal error or not
    return createError({ status: 400, message: 'Bad request', statusMessage: 'Bad request message' })
  }))
  .get('/fatal-error', defineEventHandler(() => {
    // Fatal errors will stop the execution of the current request and will be logged
    return createError({ status: 500, message: 'Fatal error', fatal: true, data: { foo: 'bar' } })
  }))

app.use(router)

createServer(toNodeListener(app)).listen(3000)
