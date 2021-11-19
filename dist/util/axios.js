"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cookie_1 = require("./cookie");
axios_1.default.defaults.headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Connection: "keep-alive",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    Host: "www.youdao.com",
};
axios_1.default.interceptors.request.use(async (config) => {
    const cookiesString = await cookie_1.cookiesToString();
    const cookie = [cookiesString];
    const cookieStrings = config.headers["Set-Cookie"];
    if (cookieStrings)
        cookie.push(cookieStrings);
    config.headers["Cookie"] = cookie.join(";");
    if (!config.headers.Referer)
        config.headers.Referer = config.url;
    return config;
});
axios_1.default.interceptors.response.use(async (response) => {
    const { headers } = response;
    const cookieStrings = headers["set-cookie"] || [];
    cookie_1.saveCookies(cookieStrings);
    return response;
});
exports.default = axios_1.default;
//# sourceMappingURL=axios.js.map