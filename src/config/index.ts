import * as dotenv from "dotenv";
dotenv.config();
const { SERVER_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, LOG_PATH } = process.env;

export default () => ({
  projectName: 'nestjs-base',
  serverPort: parseInt(SERVER_PORT) || 3000,
  dbConfig: {
    client: "mysql2",
    connection: {
      host: DB_HOST || "localhost",
      user: DB_USER || "wibuslayer",
      password: DB_PASSWORD || "hieudai1998",
      database: DB_DATABASE || "pet_project",
    },
    pool: { min: 0, max: 7 },
  },
  logPath: LOG_PATH
});
