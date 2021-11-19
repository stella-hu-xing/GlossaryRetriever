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
exports.retrieveWordList = void 0;
const fs = __importStar(require("fs/promises"));
const youDaoApi = __importStar(require("../repository/youDaoApi"));
exports.retrieveWordList = async (ctx) => {
    await youDaoApi.login();
    const totalNumber = await getTotalNumber();
    console.log(`succesfully get total ${totalNumber} words`);
    if (totalNumber < 1) {
        return;
    }
    const result = await youDaoApi.getAllWords(totalNumber);
    const itemList = result.data.data.itemList;
    console.log(`saving ${itemList.length} words to local storage`);
    const wordlist = mapper(itemList);
    await saveToFile(wordlist);
    console.log(`done`);
};
const getTotalNumber = async () => {
    const result = await youDaoApi.getAllWords();
    return result.data.data.total;
};
const mapper = (itemList) => {
    const worklist = [];
    itemList.map((e) => worklist.push({
        itemId: e.itemId,
        item: e.word,
        trans: e.trans,
        phonetic: e.phonetic === "" || e.phonetic === "[]" ? undefined : e.phonetic,
        tag: e.bookName === "无标签" ? undefined : e.bookName,
    }));
    return worklist;
};
const saveToFile = async (wordList) => {
    await fs.writeFile("./src/repository/wordlist.json", JSON.stringify(wordList));
};
//# sourceMappingURL=retrieveWordList.js.map