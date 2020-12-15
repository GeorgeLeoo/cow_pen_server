'use strict';

const Controller = require('egg').Controller;
const Response = require('../lib/Response');
const Utils = require('../utils');

/**
 * @controller UserService
 */
class UserController extends Controller {
  /**
   * @summary 登录
   * *@router post /login
   * *@request body loginBody *body
   * *@response 200 tokenBody 返回结果
   */
  async login() {
    const { ctx, service, app } = this;

    const response = new Response(ctx);

    const { username, password } = ctx.request.body;

    const user = await service.userService.findByUsernameAndPassword(username, password);

    if (!Utils.hasValueInArray(user)) {
      response.fail([], '用户名或密码不正确');
      return;
    }

    const tokenData = Utils.accessToken(app, { username });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await app.redis.set(Utils.encryption(tokenData[0].token), user[0].id);
    response.success(tokenData, '');
  }

  /**
   * @summary 注册
   * *@router post /register
   * *@request body loginBody *body
   * *@response 200 loginResponse 返回结果
   */
  async register() {
    const { ctx, service } = this;

    const response = new Response(ctx);

    const { username, password } = ctx.request.body;

    const findUser = await service.userService.findByUsername(username);

    if (!findUser) {
      const user = await service.userService.createUser(username, password);

      if (user && user.errors && user.errors[0] && user.errors[0].type === 'unique violation') {
        response.fail([], '用户名已存在');
        return;
      }

      response.success(user, '注册成功');
      return;
    }

    response.fail([], '用户名已存在');
  }

  /**
   * @summary 注册
   * *@router post /register
   * *@request body loginBody *body
   * *@response 200 loginResponse 返回结果
   */
  async getUserInfoById() {
    const { ctx, service, app } = this;

    const response = new Response(ctx);
    const token = ctx.request.header['x-auth'];
    const encryptionToken = Utils.encryption(token);
    const id = await app.redis.get(encryptionToken);
    if (id) {
      const user = await service.userService.findById(parseInt(id));
      response.success(user, '');
    } else {
      response.send(409, [], '无 uid');
    }
  }

  /**
   * @summary 退出登录
   * *@router post /logout
   * *@request body loginBody *body
   * *@response 200 loginResponse 返回结果
   */
  async logout() {
    const { ctx, app } = this;

    const response = new Response(ctx);

    const { token } = ctx.request.body;

    await app.redis.del(token);
    response.success([], '退出登录成功');
  }
}

module.exports = UserController;
