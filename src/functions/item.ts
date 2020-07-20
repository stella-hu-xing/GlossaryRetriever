export interface WordList {
  total: number;
  words: WordItem[];
}

/***
 *  {
        "itemId": "0ae734d141fda58d962241efd2d0b2bb",
        "bookId": "0",
        "bookName": "无标签",
        "word": "aggrieved",
        "trans": "adj. 受委屈的，愤愤不平的；权利受到不法侵害的 \nv. 侵害，伤害（aggrieve的过去分词形式）；使悲痛",
        "phonetic": "[ə'griːvd]",
        "modifiedTime": 1588499616000
    },
 */
export interface WordItem {
  word: string;
  trans: string;
  phonetic: string;
  category?: Category;
}

// TODO
export interface Category {
  id: string;
  name: string;
}
