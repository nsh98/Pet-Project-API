import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UsersService } from "./user.service";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  @HttpCode(200)
  createNewUser(@Body() body): Promise<{}> {
    return this.usersService.createNewUser(body);
  }

  @Post("edit")
  @HttpCode(200)
  editUser(@Body() body): Promise<{}> {
    return this.usersService.editUser(body);
  }

  @Post("delete")
  @HttpCode(200)
  deleteUser(userId: number): Promise<{}> {
    return this.usersService.deleteUser(userId);
  }

  @Post("get-all")
  @HttpCode(200)
  getAllUsers(): Promise<{}> {
    return this.usersService.getAllUsers();
  }

  @Post("get-one")
  @HttpCode(200)
  getUserById(@Body() body): Promise<{}> {
    return this.usersService.getUserById(body.id);
  }
}
