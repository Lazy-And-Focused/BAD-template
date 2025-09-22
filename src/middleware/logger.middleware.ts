import type { Request, Response, NextFunction } from "express";

import { Injectable, NestMiddleware } from "@nestjs/common";
import { logger } from "@sentry/nestjs";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, _res: Response, next: NextFunction) {
    logger.info("Request to " + req.url);
    next();
  }
}

export default LoggerMiddleware;
