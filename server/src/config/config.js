import dotenv from 'dotenv';
const env = process.env;
dotenv.config();

const development = {
  username: env.AWS_MYSQL_USER,
  password: env.AWS_MYSQL_PASSWORD,
  database: env.AWS_MYSQL_DATABASE,
  host: env.AWS_MYSQL_URL,
  dialect: "mysql",
  port: env.AWS_MYSQL_PORT,
  timezone: '+09:00',
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

export { development, production, test };
