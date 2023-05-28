import { Sequelize } from 'sequelize-typescript';
import * as models from './models';

export const sequelizeProvider = async () =>{
  const sequelize = new Sequelize(
    `${process.env.DATABASE_DRIVER}://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  )

  sequelize.addModels(Object.keys(models).map(name => models[name]));
  
  return sequelize;
}