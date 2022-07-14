import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { ValidationModule } from "src/middlewares/validator";
import { getUserByIdSchema, createNewUserSchema, editUserSchema } from "src/user/validate.schema";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ValidationModule.forRoot({
      validator: getUserByIdSchema,
      forRoutes: ['user/get-one'],
    }),
    ValidationModule.forRoot({
      validator: createNewUserSchema,
      forRoutes: ['user/create'],
    }),
    ValidationModule.forRoot({
      validator: editUserSchema,
      forRoutes: ['user/edit'],
    })
  ],
})
export class UsersModule {}
