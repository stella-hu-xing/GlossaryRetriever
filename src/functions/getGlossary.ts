import { RouterContext } from "koa-router";

import * as youDaoApi from "../Infrastructure/youDaoApi";
import { WordList } from "./item";
import { save } from "../Infrastructure/wordRepository";

export const getGlossary = async (ctx: RouterContext): Promise<string> => {
  await login();
  const result = await youDaoApi.getWholeList();
  const wordList = result.data.data as WordList;
  save(wordList);
  return result.data.data.itemList;
};

async function login() {
  const result = await youDaoApi.login();

  const { headers } = result;
  if (!headers["set-cookie"]) {
    throw new Error(
      `login fail, pleace check your email or password and try again`
    );
  }
}
