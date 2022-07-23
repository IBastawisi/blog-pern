import { Sequelize } from 'sequelize-typescript';
import { Blog, User } from '../models';
import { DATABASE_URL } from './env.config';

const sequelize = new Sequelize(DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

sequelize.addModels([User, Blog]);

User.sync({ alter: true });
Blog.sync({ alter: true });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

export { connectToDatabase, sequelize }