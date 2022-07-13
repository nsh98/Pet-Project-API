import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { LoggerService } from "src/logger/logger.service";

@Injectable()
export class HttpLogger implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.HTTP.request(req)
    next();
  }
}
