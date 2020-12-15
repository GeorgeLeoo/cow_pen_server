'use strict';

class Response {

  constructor(ctx) {
    this.ctx = ctx;
  }

  send(code, data, msg) {
    if (this.ctx) {
      this.ctx.status = code;
      this.ctx.body = {
        code: this.ctx.status,
        msg,
        data,
      };
    } else {
      throw new Error('send error');
    }
  }

  success(data, msg) {
    this.send(200, data, msg);
  }

  fail(data, msg) {
    this.send(400, data, msg);
  }
}

Response.DocResponse = (itemType) => {
  return {
    code: { type: 'number', required: true, description: '状态码，200 成功，400 错误，500 服务器错误' },
    msg: { type: 'string', required: true, default: '', description: '错误信息，默认为空字符串' },
    data: { type: 'array', required: true, itemType, description: '结果集' },
  };
};

module.exports = Response;
