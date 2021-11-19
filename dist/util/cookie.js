"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookiesToString = exports.cleanCookies = exports.removeCookies = exports.saveCookies = exports.loadCookies = exports.parseCookies = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const util_1 = require("util");
const cookie_1 = __importDefault(require("cookie"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const cookieCachePath = path.resolve(__dirname, "../..", ".cache/cookie");
const cookieCache = path.resolve(cookieCachePath, "index.json");
exports.parseCookies = (cookieStrings) => cookieStrings.reduce((customCookies, cookieString) => {
    const parsedCookie = cookie_1.default.parse(cookieString);
    const key = Object.keys(parsedCookie)[0];
    const value = parsedCookie[key];
    customCookies[key] = value;
    return customCookies;
}, {});
_a = (() => {
    let cookies;
    const load = async () => {
        if (!cookies) {
            await util_1.promisify(mkdirp_1.default)(cookieCachePath);
            try {
                const cookieString = await util_1.promisify(fs.readFile)(cookieCache, {
                    encoding: "utf8",
                });
                if (cookieString) {
                    cookies = JSON.parse(cookieString);
                }
            }
            catch (error) {
                cookies = {};
            }
        }
        return cookies;
    };
    const save = async (cookieStrings) => {
        const parasedCookies = exports.parseCookies(cookieStrings);
        const nowCookies = await load();
        cookies = Object.assign({}, nowCookies, parasedCookies);
        await util_1.promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
    };
    const remove = async (cookieNames) => {
        cookieNames.forEach((name) => {
            cookies[name] = undefined;
        });
        await util_1.promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
    };
    const clean = async () => {
        cookies = {};
        await util_1.promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
    };
    return {
        loadCookies: load,
        saveCookies: save,
        removeCookies: remove,
        cleanCookies: clean,
    };
})(), exports.loadCookies = _a.loadCookies, exports.saveCookies = _a.saveCookies, exports.removeCookies = _a.removeCookies, exports.cleanCookies = _a.cleanCookies;
exports.cookiesToString = async () => {
    const cookies = await exports.loadCookies();
    const cookieStrings = Object.keys(cookies).map((key) => [key, cookies[key]].join("="));
    return cookieStrings.join(";");
};
//# sourceMappingURL=cookie.js.map