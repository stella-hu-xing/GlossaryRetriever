import { RouterContext } from "koa-router";
import * as fs from "fs/promises";
import { Word } from "../models/word";

export const pickWords = async (ctx: RouterContext): Promise<Word[]> => {
  const pickNumber = 20;
  console.log(`selecting ${pickNumber} words into today's memory task`);

  const result = await fs.readFile("./src/repository/wordlist.json", {
    encoding: "utf-8",
  });
  const wordlist = JSON.parse(result) as Word[];
  return randomList(wordlist, pickNumber);
};

const randomList = (wordlist: Word[], pickupNumber: number) => {
  const set = new Set();
  const worklistNumber = wordlist.length;
  while (set.size < pickupNumber) {
    const item = Math.round(Math.random() * (worklistNumber - 0) + 0);
    set.add(item);
  }
  const list: Word[] = [];
  const array = [...set] as number[];
  array.map((i) => {
    list.push(wordlist[i]);
  });
  return list;
};
