import { Injectable } from "@nestjs/common";
import { ConnectDatabaseService } from "src/connectDatabase/connectDatabase.service";
import { LoggerService } from "src/logger/logger.service";
import { ResponseService } from "src/response/response.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly db: ConnectDatabaseService,
    private readonly logger: LoggerService,
    private readonly response: ResponseService
  ) {}

  async createNewUser(data): Promise<{}> {
    try {
      const { userName, password } = data;
      const connectDatabase = await this.db.getDBConnection();
      const existingUser = await connectDatabase
        .select("*")
        .from("user")
        .where({ user_name: userName })
        .first();

      if (existingUser) {
        return this.response.warn(409, "User already exists");
      }
      const dataToBeInserted = {
        user_name: userName,
        password: password,
      };
      await connectDatabase.insert(dataToBeInserted).into("user");
      return this.response.success("New user created!");
    } catch (error) {
      this.logger.APP.error(error.stack);
      return this.response.error(500, "Internal server error");
    }
  }

  async editUser(data): Promise<{}> {
    try {
      const connectDatabase = await this.db.getDBConnection();
      const { userId, userName, password } = data;

      const existingUser = await connectDatabase
        .select("*")
        .from("user")
        .where({ id: userId })
        .first();

      if (!existingUser) {
        return this.response.warn(404, "Not found user");
      }

      const dataToBeInserted = {
        user_name: userName,
        password: password,
      };

      await connectDatabase
        .update(dataToBeInserted)
        .where("id", userId)
        .into("user");

      return this.response.success("User updated!");
    } catch (error) {
      this.logger.APP.error(error.stack);
      return this.response.error(500, "Internal server error");
    }
  }

  async deleteUser(userId: number): Promise<{}> {
    try {
      const connectDatabase = await this.db.getDBConnection();
      const user = await connectDatabase
        .update({ is_delete: true })
        .where("id", userId)
        .from("users");
      if (user.length === 0) {
        return this.response.warn(404, "Not found user");
      }
      return this.response.success("User deleted!", user);
    } catch (error) {
      this.logger.APP.error(error.stack);
      return this.response.error(500, "Internal server error");
    }
  }

  async getAllUsers(): Promise<{}> {
    try {
      const connectDatabase = await this.db.getDBConnection();
      const user = await connectDatabase.select("*").from("user");
      if (user.length === 0) {
        return this.response.warn(404, "Not found user");
      }
      return this.response.success("Get all users", user);
    } catch (error) {
      this.logger.APP.error(error.stack);
      return this.response.error(500, "Internal server error");
    }
  }

  async getUserById(userId: number): Promise<{}> {
    try {
      const connectDatabase = await this.db.getDBConnection();
      const user = await connectDatabase
        .select("*")
        .from("user")
        .where("id", userId)
        .first();
      if (!user) {
        return this.response.warn(404, "Not found user");
      }
      return this.response.success("Get user by id", user);
    } catch (error) {
      this.logger.APP.error(error.stack);
      return this.response.error(500, "Internal server error");
    }
  }
}
