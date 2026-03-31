import { Sequelize } from "sequelize";
import { config } from "../../../config/env";

const { SEQUELIZE } = config;
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_TIMEZONE } = SEQUELIZE;
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
  timezone: "+07:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+07:00",
  },

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
});
