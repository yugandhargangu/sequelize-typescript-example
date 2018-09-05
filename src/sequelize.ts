import {Sequelize} from 'sequelize-typescript';

// mysql database config with sequelize
export const sequelize = new Sequelize({
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op as any,
  database: 'movies',
  username: 'movies',
  password: 'movies',
  modelPaths: [__dirname + '/models']
});
