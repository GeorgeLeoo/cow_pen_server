'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  swaggerdoc: {
    enable: true, // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
