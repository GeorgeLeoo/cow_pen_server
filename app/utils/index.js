'use strict';

const salt = 'coW_pEn_MOb1996GeorgeLeoo12NJ19';

class Utils {}

Utils.hasValueInArray = array => array && array.length > 0;

/**
 * 生成token
 * @param app
 * @param {object} content  对某个内容生成 token
 */
Utils.accessToken = (app, content) => {
  const expiresIn = Math.round((new Date().getTime() / 1000)) + 3600; // 过期时间
  // const expiresIn = 60 * 60 * 24; // 过期时间
  // const expiresIn = 1; // 立刻过期
  const token = app.jwt.sign(content, app.secret, { expiresIn });
  const res = {
    token,
    expiresIn,
  };
  return [ res ];
};

/**
 * @description 加密
 * @param {string} value
 */
Utils.encryption = value => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const md5 = require('js-md5');
  return md5(salt + md5(salt + value));
};

module.exports = Utils;
