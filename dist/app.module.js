"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_module_1 = require("./logger/logger.module");
const nest_winston_1 = require("nest-winston");
const connectDatabase_module_1 = require("./connectDatabase/connectDatabase.module");
const users_module_1 = require("./users/users.module");
const response_module_1 = require("./response/response.module");
const config_2 = require("./config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
                envFilePath: ".env",
            }),
            logger_module_1.LoggerModule,
            nest_winston_1.WinstonModule.forRoot({}),
            connectDatabase_module_1.ConnectDatabaseModule,
            users_module_1.UsersModule,
            response_module_1.ResponseModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map