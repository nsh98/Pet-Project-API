import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./logger/logger.module";
import { WinstonModule } from "nest-winston";
import { ConnectDatabaseModule } from "./connectDatabase/connectDatabase.module";
import { UsersModule } from "./users/users.module";
import configuration from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ".env",
    }),
    LoggerModule,
    WinstonModule.forRoot({}),
    ConnectDatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
