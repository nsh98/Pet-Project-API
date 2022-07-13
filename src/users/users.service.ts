import { Injectable } from '@nestjs/common';
import { ConnectDatabaseService } from 'src/connectDatabase/connectDatabase.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: ConnectDatabaseService,
    private readonly logger: LoggerService
  ) {}
  async getAllUsers() {
    const connectDatabase = await this.db.getDBConnection();
    const user = connectDatabase.select("*").from("user");
    return user;
  }
}
