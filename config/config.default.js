/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608036056224_8794';

  // add your middleware config here
  config.middleware = [];


  // egg-swagger-doc 配置信息。
  const swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'CowPen', // 接口文档的标题。
      description: 'swagger-ui for CowPen document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    // basePath: '/v2',
    schemes: [ 'http', 'https' ], // 配置支持的协议。
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: { // 配置接口安全授权方式。
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };

  // const mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: '139.159.201.22',
  //     // 端口号
  //     port: '28003',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: '123456',
  //     // 数据库名
  //     database: 'cowPen',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  const sequelize = {
    dialect: 'mysql',
    host: '139.159.201.22',
    port: 28003,
    username: 'root',
    password: '123456',
    database: 'cowPen',
    define: {
      freezeTableName: true, // Model 对应的表名将与model名相同。
      timestamps: false, // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新（ 确实是太方便了，然而我们一般用不到 ....）。
    },
  };

  const redis = {
    client: {
      port: 15001, // Redis port
      host: '139.159.201.22', // Redis host
      password: '123loveyou,',
      db: 0,
    },
  };

  config.jwt = {
    secret: 'cOw2020PEn1996Georgeleeo',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:9092' ], // 允许访问接口的白名单
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    redis,
    sequelize,
    swaggerdoc,
  };

  return {
    ...config,
    ...userConfig,
  };
};
