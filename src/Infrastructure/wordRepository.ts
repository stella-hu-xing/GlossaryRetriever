import { WordList } from "../functions/item";
import * as path from "path";
import * as fs from "fs";

export const save = (wordList: WordList) => {
  const filePath = path.resolve(__dirname, "./storage", "wordList.json");
  const data = JSON.stringify(wordList.words, null, 2);
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
