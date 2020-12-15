'use strict';

const Response = require('../lib/Response');

const loginBody = {
  username: { type: 'string', required: true, description: '用户名' },
  password: { type: 'string', required: true, description: '密码' },
};

const tokenBody = {
  token: { type: 'string', required: true, description: 'token' },
  expiresIn: { type: 'string', required: true, description: 'token过期时间' },
};

module.exports = {
  loginBody,
  tokenBody,
  loginResponse: Response.DocResponse('loginBody'),
};
