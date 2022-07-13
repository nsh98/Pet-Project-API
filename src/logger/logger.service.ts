import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger, transports, loggers, format } from "winston";
import { ConfigService } from "@nestjs/config";
import * as path from "path";

@Injectable()
export class LoggerService {
  public readonly APP: any;
  public readonly HTTP: any;
  public readonly DATABASE: any;

  private getTransports(level: string, filename: string) {
    return new transports.File({
      level,
      filename: path.join(this.configService.get("logPath"), filename),
      handleExceptions: false,
      maxsize: 10485760,
      maxFiles: 50,
    });
  }

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {
    const appFormatter = format.combine(
      format.label({ label: this.configService.get("projectName") }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.printf(
        (info) =>
          `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
      )
    );

    const httpFormatter = format.combine(
      format.label({ label: this.configService.get("projectName") }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        (info) =>
          `[${info.label || ""}]\t${info.timestamp}\t[${
            info.level.toUpperCase() || ""
          }]\t[${info.type || ""}]\t[${info.ip || ""}]\t[${
            info.method || ""
          }]\t${info.url || ""}\t[${info.identify || ""}]`
      )
    );

    const databaseFormatter = format.combine(
      format.label({ label: this.configService.get("projectName") }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        (info) =>
          `[${info.label || ""}]\t${info.timestamp}\t[${
            info.level.toUpperCase() || ""
          }]\t[${info.type || "SQL"}]\t${
            info.message ? JSON.stringify(info.message) : ""
          }`
      )
    );

    loggers.add("app", {
      format: appFormatter,
      transports: [
        this.getTransports("info", "app-info.log"),
        this.getTransports("error", "app-error.log"),
      ],
    });

    loggers.add("http", {
      format: httpFormatter,
      transports: [this.getTransports("info", "http-info.log")],
    });

    loggers.add("database", {
      format: databaseFormatter,
      transports: [
        this.getTransports("info", "database-info.log"),
        this.getTransports("error", "database-error.log"),
      ],
    });

    this.APP = loggers.get("app");
    this.HTTP = loggers.get("http");
    this.HTTP.request = async (request: any) => {
      const data = {
        ...request.body,
        ...request.query,
        ...request.params,
      };
      this.HTTP.info(data, {
        type: "REQUEST",
        ip: request.ip,
        url: request.baseUrl,
        method: request.method,
        identify: request.user,
      });
    };
    this.DATABASE = loggers.get("database");
    this.DATABASE.query = async (data: any) => {
      this.DATABASE.info(data, { type: "SQL" });
    };

    this.APP.exitOnError = false;
    this.HTTP.exitOnError = false;
    this.DATABASE.exitOnError = false;
  }
}
