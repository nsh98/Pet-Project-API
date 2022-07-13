import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { ConnectDatabaseService } from "../connectDatabase/connectDatabase.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private connectDatabaseService: ConnectDatabaseService) {}

  @Post("create")
  createNewUser(data: object): Promise<{}>{
    return this.usersService.createNewUser(data);
  }

  @Post("edit")
  editUser(userId: number, data: object): Promise<{}>{
    return this.usersService.editUser(userId, data);
  }

  @Post("delete")
  deleteUser(userId: number): Promise<{}>{
    return this.usersService.deleteUser(userId);
  }

  @Post()
  getAllUsers(): Promise<{}>{
    return this.usersService.getAllUsers();
  }

  @Post()
  getUserById(userId: number): Promise<{}>{
    return this.usersService.getUserById(userId);
  }
}
