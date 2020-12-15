'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router, jwt } = app;

  router.get('/', jwt, controller.home.index);
  router.post('/login', controller.userController.login);
  router.post('/register', controller.userController.register);
  router.post('/logout', controller.userController.logout);
  router.get('/user', controller.userController.getUserInfoById);
};
