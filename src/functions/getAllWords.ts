import { RouterContext } from "koa-router";

import * as youDaoApi from "../youDaoApi";
import { config } from "../config";

export const getAllWords = async (ctx: RouterContext): Promise<string> => {
  const decode = (str: string): string =>
    Buffer.from(str, "base64").toString("binary");

  await youDaoApi.login(config.accountName, decode(config.accountPwd));
  const result = await youDaoApi.getAll();

  return JSON.stringify(result.status); //result.data;
};
