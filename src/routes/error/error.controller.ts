import { Controller as NestController, Get, Injectable, HttpException, Query, HttpStatus } from "@nestjs/common";

import { ROUTE, ROUTES } from "./error.routes";

@Injectable()
@NestController(ROUTE)
export class Controller {
  @Get(ROUTES.GET)
  public get() {
    throw new Error("Test error for sentry");
  }

  @Get(ROUTES.GET_HTTP)
  public getHttp(
    @Query("status") status?: string
  ) {
    if (!status) {
      throw new HttpException("Not found TEST", HttpStatus.NOT_FOUND);
    }

    throw new HttpException("Exeption TEST", +status);
  }
}

export default Controller;
