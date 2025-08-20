import { Controller as NestController, Get, Injectable } from "@nestjs/common";

import { ROUTE } from "./error.routes";

@Injectable()
@NestController(ROUTE)
export class Controller {
  @Get()
  public get() {
    throw new Error("Test error for sentry");
  }
}

export default Controller;
