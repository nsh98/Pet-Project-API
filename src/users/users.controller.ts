import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ConnectDatabaseService } from "../connectDatabase/connectDatabase.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private connectDatabaseService: ConnectDatabaseService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
