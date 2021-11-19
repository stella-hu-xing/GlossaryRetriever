"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWords = exports.login = void 0;
const axios_1 = __importDefault(require("../util/axios"));
const md5_hex_1 = __importDefault(require("md5-hex"));
const config_1 = require("../config");
const querystring_1 = require("querystring");
/**
 *  reference: https://github.com/HighSkySky/yd-word-book/blob/master/src/api.ts
 */
exports.login = async () => {
    const decode = (str) => Buffer.from(str, "base64").toString("binary");
    const username = decode(config_1.config.accountName);
    const password = md5_hex_1.default(decode(config_1.config.accountPwd));
    // 获取登陆基础的cookie
    await axios_1.default({
        method: "GET",
        url: "http://account.youdao.com/login?service=dict",
        headers: {
            Host: "account.youdao.com",
        },
        timeout: 4000,
    });
    const formData = Object.assign({
        app: "web",
        tp: "urstoken",
        cf: 7,
        fr: 1,
        ru: "http://dict.youdao.com/wordbook/wordlist?keyfrom=login_from_dict2.index",
        product: "DICT",
        type: 1,
        um: true,
        agreePrRule: 1,
        savelogin: 1,
    }, { username, password });
    const result = await axios_1.default({
        method: "POST",
        url: "https://logindict.youdao.com/login/acc/login",
        maxRedirects: 0,
        validateStatus: (status) => status < 400,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Host: "logindict.youdao.com",
            Origin: "http://account.youdao.com",
            Referer: "http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dlogin_from_dict2.index",
        },
        data: querystring_1.stringify(formData),
        timeout: 4000,
    });
    const { headers } = result;
    if (!headers["set-cookie"]) {
        throw new Error(`login fail, pleace check your email or pwaaword current and try again`);
    }
    return result;
};
exports.getAllWords = async (total) => {
    const limit = total ? `?limit=${total}` : "";
    const url = `http://dict.youdao.com/wordbook/webapi/words${limit}`;
    return axios_1.default({
        method: "GET",
        url,
        timeout: 6000,
    });
};
//# sourceMappingURL=youDaoApi.js.map