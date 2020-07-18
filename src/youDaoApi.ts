import axios from "./util/axios";

/**
 *  reference: https://github.com/HighSkySky/yd-word-book/blob/master/src/api.ts
 */

export const login = async (username: string, password: string) => {
  // 获取登陆基础的cookie
  await axios({
    method: "GET",
    url: "http://account.youdao.com/login?service=dict",
    headers: {
      Host: "account.youdao.com",
    },
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
  // 登陆
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
    data: JSON.stringify(formData),
  });
};

export const getAll = async () => {
  return axios({
    method: "GET",
    url: "http://dict.youdao.com/wordbook/webapi/words",
  });
};
