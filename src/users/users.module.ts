import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
// import { ConnectDatabaseService } from "../connectDatabase/connectDatabase.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
