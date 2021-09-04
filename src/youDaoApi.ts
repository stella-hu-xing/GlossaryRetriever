import axios from "./util/axios";
import md5Hex from "md5-hex";
import { config } from "./config";
import { stringify } from "querystring";
/**
 *  reference: https://github.com/HighSkySky/yd-word-book/blob/master/src/api.ts
 */

export const login = async () => {
  const decode = (str: string): string =>
    Buffer.from(str, "base64").toString("binary");
  const username = decode(config.accountName);
  const password = md5Hex(decode(config.accountPwd));

  // 获取登陆基础的cookie
  await axios({
    method: "GET",
    url: "http://account.youdao.com/login?service=dict",
    headers: {
      Host: "account.youdao.com",
    },
    timeout: 4000,
  });
  const formData = Object.assign(
    {
      app: "web",
      tp: "urstoken",
      cf: 7,
      fr: 1,
      ru:
        "http://dict.youdao.com/wordbook/wordlist?keyfrom=login_from_dict2.index",
      product: "DICT",
      type: 1,
      um: true,
      agreePrRule: 1,
      savelogin: 1,
    },
    { username, password }
  );
  return axios({
    method: "POST",
    url: "https://logindict.youdao.com/login/acc/login",
    maxRedirects: 0,
    validateStatus: (status) => status < 400,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "logindict.youdao.com",
      Origin: "http://account.youdao.com",
      Referer:
        "http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dlogin_from_dict2.index",
    },
    data: stringify(formData),
    timeout: 4000,
  });
};

export const getAll = async () => {
  return axios({
    method: "GET",
    url: "http://dict.youdao.com/wordbook/webapi/words",
  });
};
