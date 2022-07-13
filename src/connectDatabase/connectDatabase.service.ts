import { Injectable } from "@nestjs/common";
import knex from "knex";
import dbSchemas from "../databaseSchemas";
import { ConfigService } from "@nestjs/config";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class ConnectDatabaseService {
  private readonly connection: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService
  ) {
    const dbConfig = this.configService.get("dbConfig");
    this.connection = knex(dbConfig);
    this.connection.on("query", this.loggerService.DATABASE.query);
    this.connection.on("query-error", this.loggerService.DATABASE.error.bind(this.loggerService.DATABASE));
    this.connection.on("query-response", this.loggerService.DATABASE.query);
    this.initDatabases();
  }

  initDatabases() {
    const { initUserTable } = dbSchemas;
    initUserTable(this.connection);
  }

  async getDBConnection() {
    return this.connection;
  }
}
