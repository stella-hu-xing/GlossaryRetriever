import Koa from "koa";
import Router from "koa-router";
import { pickWords } from "./functions/pickWords";
import { retrieveWordList } from "./functions/retrieveWordList";

export const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.get("/all", async (ctx) => {
  const result = await retrieveWordList(ctx);
  ctx.body = result;
  ctx.status = 200;
});

router.get("/pick", async (ctx) => {
  const result = await pickWords(ctx);
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
