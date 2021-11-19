"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const pickWords_1 = require("./functions/pickWords");
const retrieveWordList_1 = require("./functions/retrieveWordList");
exports.app = new koa_1.default();
const router = new koa_router_1.default();
router.get("/", async (ctx) => {
    ctx.body = "Hello World!";
});
router.get("/all", async (ctx) => {
    const result = await retrieveWordList_1.retrieveWordList(ctx);
    ctx.body = result;
    ctx.status = 200;
});
router.get("/pick", async (ctx) => {
    const result = await pickWords_1.pickWords(ctx);
    ctx.body = result;
    ctx.status = 200;
});
exports.app.use(router.middleware());
exports.app.use(router.routes());
exports.app.on("error", (err, ctx) => ctx.status < 500
    ? console.warn({
        activity: "client error",
        status: ctx.status,
        err: err instanceof Error ? err.message : JSON.stringify(err),
    })
    : console.error({
        activity: "unexpected error",
        status: ctx.status,
        err: err instanceof Error ? err.message : JSON.stringify(err),
    }));
//# sourceMappingURL=app.js.map