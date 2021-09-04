import { RouterContext } from "koa-router";
import * as fs from "fs/promises";

import * as youDaoApi from "../repository/youDaoApi";
import { Word } from "../models/word";

interface RawItem {
  itemId: string;
  bookId: string;
  bookName: string;
  word: string;
  trans: string;
  phonetic: string;
  modifiedTime: number;
}

export const retrieveWordList = async (ctx: RouterContext): Promise<void> => {
  await youDaoApi.login();
  const totalNumber = await getTotalNumber();
  console.log(`succesfully get total ${totalNumber} words`);
  if (totalNumber < 1) {
    return;
  }
  const result = await youDaoApi.getAllWords(totalNumber);
  const itemList = result.data.data.itemList as RawItem[];

  console.log(`saving ${itemList.length} words to local storage`);
  const wordlist = mapper(itemList);
  await saveToFile(wordlist);
  console.log(`done`);
};

const getTotalNumber = async () => {
  const result = await youDaoApi.getAllWords();
  return result.data.data.total as number;
};

const mapper = (itemList: RawItem[]): Word[] => {
  const worklist: Word[] = [];
  itemList.map((e) =>
    worklist.push({
      itemId: e.itemId,
      item: e.word,
      trans: e.trans,
      phonetic: e.phonetic,
      tag: e.bookName === "无标签" ? "" : e.bookName,
    })
  );
  return worklist;
};

const saveToFile = async (wordList: Word[]) => {
  await fs.writeFile(
    "./src/repository/wordlist.json",
    JSON.stringify(wordList)
  );
};
