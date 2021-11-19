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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickWords = void 0;
const fs = __importStar(require("fs/promises"));
exports.pickWords = async (ctx) => {
    const pickNumber = 20;
    console.log(`selecting ${pickNumber} words into today's memory task`);
    const result = await fs.readFile("./src/repository/wordlist.json", {
        encoding: "utf-8",
    });
    const wordlist = JSON.parse(result);
    return randomList(wordlist, pickNumber);
};
const randomList = (wordlist, pickupNumber) => {
    const set = new Set();
    const worklistNumber = wordlist.length - 1;
    while (set.size < pickupNumber) {
        const item = Math.round(Math.random() * (worklistNumber - 0) + 0);
        set.add(item);
    }
    const list = [];
    const array = [...set];
    array.map((i) => {
        list.push(wordlist[i]);
    });
    return list;
};
//# sourceMappingURL=pickWords.js.map