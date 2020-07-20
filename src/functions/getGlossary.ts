import { RouterContext } from "koa-router";

import * as youDaoApi from "../Infrastructure/youDaoApi";
import { save } from "../Infrastructure/wordRepository";
import { WordList, WordItem } from "./item";

export const getGlossary = async (ctx: RouterContext): Promise<string> => {
  // await login();
  // const result = await youDaoApi.getWholeList();
  // const wordList = result.data.data as WordList;
  save(mapper(list));
  return "got the result and save it to file";
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

const mapper = (data: any): WordList => {
  const wordMapper = (data: any): WordItem => {
    return {
      word: data.word,
      trans: data.trans,
      phonetic: data.phonetic,
      category:
        data.bookId === "0"
          ? undefined
          : {
              id: data.bookId,
              name: data.bookName,
            },
    };
  };
  return {
    total: data.total,
    words: data.itemList.map((x: any) => wordMapper(x)),
  };
};

const list = {
  total: 33,
  itemList: [
    {
      itemId: "0ae734d141fda58d962241efd2d0b2bb",
      bookId: "0",
      bookName: "无标签",
      word: "aggrieved",
      trans:
        "adj. 受委屈的，愤愤不平的；权利受到不法侵害的 \nv. 侵害，伤害（aggrieve的过去分词形式）；使悲痛",
      phonetic: "[ə'griːvd]",
      modifiedTime: 1588499616000,
    },
    {
      itemId: "4a286ad4ee2e17cd86f47f7a0e595c95",
      bookId: "0",
      bookName: "无标签",
      word: "algebra",
      trans: "n. 代数学",
      phonetic: "[ˈældʒɪbrə]",
      modifiedTime: 1584781566000,
    },
    {
      itemId: "d4d3f512617ae7a7adbdf7cfb1e1bd05",
      bookId: "0",
      bookName: "无标签",
      word: "amulet",
      trans: "n. 护身符，避邪物",
      phonetic: "[ˈæmjʊlət]",
      modifiedTime: 1585904989000,
    },
    {
      itemId: "b27e8041bb8a07830d7bb55071a353c3",
      bookId: "0",
      bookName: "无标签",
      word: "arcade",
      trans:
        "n. 拱廊；（内设投角子电子游戏机等的）游乐场；有拱廊的街道 \nvt. 使有拱廊 \nn. (Arcade)人名；(西、法)阿卡德",
      phonetic: "[ɑːˈkeɪd]",
      modifiedTime: 1584404902000,
    },
    {
      itemId: "7b61f74afc98ad3c4dd00dd135d6dfe9",
      bookId: "0",
      bookName: "无标签",
      word: "bane",
      trans:
        "n. 毒药；祸害；灭亡的原因 \nn. (Bane)人名；(法)巴纳；(塞)巴内；(日)伴卫(名)；(英)贝恩",
      phonetic: "[beɪn]",
      modifiedTime: 1587899444000,
    },
    {
      itemId: "1c5c27a92031125e7f0e1fd4f528afec",
      bookId: "0",
      bookName: "无标签",
      word: "binomial expansion",
      trans: "[数] 二项展开式",
      phonetic: "",
      modifiedTime: 1584781727000,
    },
    {
      itemId: "4417589f45344c5f82a862502d93bf76",
      bookId: "0",
      bookName: "无标签",
      word: "coefficient",
      trans: "n. [数] 系数；率；协同因素 \nadj. 合作的；共同作用的",
      phonetic: "[ˌkəʊɪˈfɪʃnt]",
      modifiedTime: 1584782612000,
    },
    {
      itemId: "8d0b879151ab2a14aa3c367fbf924b80",
      bookId: "0",
      bookName: "无标签",
      word: "conjecturable",
      trans: "adj. 可推测的，可猜想的",
      phonetic: "[kən'dʒektʃərəbl]",
      modifiedTime: 1588497973000,
    },
    {
      itemId: "90bff04ceabc5d2548ee6cdbec864704",
      bookId: "0",
      bookName: "无标签",
      word: "difference of squares",
      trans: "平方差",
      phonetic: "",
      modifiedTime: 1584781953000,
    },
    {
      itemId: "5d22ff504426a076eae3158dd81e1aec",
      bookId: "0",
      bookName: "无标签",
      word: "dipsomaniac",
      trans: "n. 耽酒症患者",
      phonetic: "[,dɪpsəʊ'meɪnɪæk]",
      modifiedTime: 1588497853000,
    },
    {
      itemId: "a119928ed2a6bbd611fa60a3be8fe68b",
      bookId: "0",
      bookName: "无标签",
      word: "factorise",
      trans: "编制计算程序",
      phonetic: "",
      modifiedTime: 1584782088000,
    },
    {
      itemId: "4888bd6d8504d2847ed18e40a74a4c75",
      bookId: "0",
      bookName: "无标签",
      word: "foreboding",
      trans: "n. 预感；先兆；预兆 \nadj. 预感的；不祥之兆的",
      phonetic: "[fɔː'bəʊdɪŋ]",
      modifiedTime: 1588498468000,
    },
    {
      itemId: "727ec225fe0c3a97000b35315f85a0bf",
      bookId: "0",
      bookName: "无标签",
      word: "helium",
      trans: "n. [化学] 氦（符号为He，2号元素）",
      phonetic: "[ˈhiːliəm]",
      modifiedTime: 1584270405000,
    },
    {
      itemId: "155b0f13eed4355b9a291bb46ac22802",
      bookId: "0",
      bookName: "无标签",
      word: "indefatigably",
      trans: "adv. 不厌倦地；不屈不挠地",
      phonetic: "[,ɪndɪ'fætɪgəbli]",
      modifiedTime: 1588499379000,
    },
    {
      itemId: "0a24ebbd4e2130f714eda695be8df9c3",
      bookId: "0",
      bookName: "无标签",
      word: "indulge",
      trans: "vt. 满足；纵容；使高兴；使沉迷于… \nvi. 沉溺；满足；放任",
      phonetic: "[ɪnˈdʌldʒ]",
      modifiedTime: 1588499349000,
    },
  ],
};
