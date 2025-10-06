import { Public } from "decorators/public.decorator";
import { AuthGuard } from "guards/auth/auth.guard";

import {
  Controller as NestController,
  Injectable,
  Get,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";

import {
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { SkipThrottle } from "@nestjs/throttler";
import { CacheTTL } from "@nestjs/cache-manager";

import { ROUTE, ROUTES } from "./test.routes";

@Injectable()
@NestController(ROUTE)
@UseGuards(AuthGuard)
export class Controller {
  public constructor() {}

  @ApiOperation({
    summary: "Getting an array of test",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @Get(ROUTES.GET)
  @Public()
  public get() {
    return "Hi from guarded test";
  }

  @ApiOperation({
    summary: "Getting an array of test",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted",
  })
  @Get(ROUTES.GET_PUBLIC)
  @Public()
  public getPublic() {
    return "Hi from public test";
  }

  @ApiOperation({
    summary: "Getting an array of test",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted",
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
  })
  @Get(ROUTES.GET_TOO_MANY_REQUESTS_NON_PROTECTED)
  @SkipThrottle()
  @CacheTTL(1)
  @Public()
  public getTooManyRequestsNonProtected() {
    return "Hi from too many requests non protected test";
  }
}
