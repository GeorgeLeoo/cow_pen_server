'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), allowNull: false, unique: true },
    password: { type: STRING(30), allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });
};
