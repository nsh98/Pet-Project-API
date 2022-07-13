import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseService {
  success(message = "", data = null, code = 200) {
    return {
      code,
      result: true,
      message,
      data,
    };
  }

  error(code = 500, message = "", data = null) {
    return {
      code,
      result: false,
      message,
      data,
    };
  }

  warn(code = 400, message = "", data = null) {
    return {
      code,
      result: false,
      message,
      data,
    };
  }
}
