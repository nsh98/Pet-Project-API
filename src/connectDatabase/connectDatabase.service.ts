import { Injectable } from "@nestjs/common";
import knex from "knex";
import dbSchemas from "../databaseSchemas";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConnectDatabaseService {
  private readonly connection: any;

  constructor(private configService: ConfigService) {
    const dbConfig = this.configService.get("dbConfig");
    this.connection = knex(dbConfig);
    this.initDatabases();
  }

  initDatabases() {
    const {initUserTable} = dbSchemas;
    initUserTable(this.connection);
  }

  async getDBConnection() {
    return this.connection;
  }
}
