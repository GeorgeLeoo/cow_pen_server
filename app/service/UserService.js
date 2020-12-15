'use strict';

// 编写业务逻辑层
const Service = require('egg').Service;

/**
 * UserService Service
 */
class UserService extends Service {

  /**
  * 通过用户名和密码查找用户
  * *@param {string} username
  * *@param {string} password
  * *@return user
  */
  async findByUsernameAndPassword(username, password) {
    return await this.ctx.model.User.findAll({ where: { username, password } });
  }

  /**
   * 通过 用户名 查找用户
   * *@param {string} username
   * *@return user
   */
  async findByUsername(username) {
    return await this.ctx.model.User.findOne({ where: { username } });
  }

  /**
   * 通过 id 查找用户
   * *@param {number} id
   * *@return user
   */
  async findById(id) {
    return await this.ctx.model.User.findOne({ where: { id }, attributes: { exclude: [ 'password' ] } });
  }

  /**
  * 创建用户
  * *@param {string} username
  * *@param {string} password
  * *@return user
  */
  async createUser(username, password) {
    return await this.ctx.model.User.create({ username, password });
  }
}

module.exports = UserService;
