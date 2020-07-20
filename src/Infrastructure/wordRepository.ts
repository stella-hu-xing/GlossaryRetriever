import { WordList } from "../functions/item";
import * as fs from "fs";

export const save = (wordList: WordList) => {
  const data = new Uint8Array(Buffer.from(wordList.itemList));
  fs.writeFile("wordList.json", data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
