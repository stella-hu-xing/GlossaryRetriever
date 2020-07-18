import { RouterContext } from "koa-router";

import * as youDaoApi from "../youDaoApi";

export const getGlossary = async (ctx: RouterContext): Promise<string> => {
  await login();
  const result = await youDaoApi.getAll();
  console.log(`succesfully get total ${result.data.data.total} words`);
  return result.data.data.itemList;
};

async function login() {
  const result = await youDaoApi.login();

  const { headers } = result;
  if (!headers["set-cookie"]) {
    throw new Error(
      `login fail, pleace check your email or pwaaword current and try again`
    );
  }
}
