import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
// import { ConnectDatabaseService } from "../connectDatabase/connectDatabase.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
