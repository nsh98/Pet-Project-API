import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./logger/logger.module";
import { WinstonModule } from "nest-winston";
import { ConnectDatabaseModule } from "./connectDatabase/connectDatabase.module";
import { UsersModule } from "./user/user.module";
import { ResponseModule } from "./response/response.module";
import configuration from "./config";
import { HttpLogger } from "./middlewares/httpLog";

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
    ResponseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogger).forRoutes("*");
  }
}
