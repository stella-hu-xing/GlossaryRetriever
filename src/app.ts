import Koa from "koa";
import Router from "koa-router";
import { getAllWords } from "./functions/getAllWords";

export const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.get("/all", async (ctx) => {
  const result = await getAllWords(ctx);
  ctx.body = result;
  ctx.status = 200;
});

app.use(router.middleware());

app.use(router.routes());

app.on("error", (err, ctx) =>
  ctx.status < 500
    ? console.warn({
        activity: "client error",
        status: ctx.status,
        err: err instanceof Error ? err.message : JSON.stringify(err),
      })
    : console.error({
        activity: "unexpected error",
        status: ctx.status,
        err: err instanceof Error ? err.message : JSON.stringify(err),
      })
);
