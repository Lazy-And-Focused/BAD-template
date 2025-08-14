import { Next, Req, Res } from "@nestjs/common";
import { Auth, AUTH_TYPES, AuthTypes } from "types";
import type { NextFunction, Request, Response } from "express";

import passport = require("passport");

const abbreviations: Map<string, AuthTypes> = new Map([]);

class AuthApi {
  private readonly _method: string;

  public constructor(method: string) {
    this._method = method;
  }

  static get methods(): Record<"abbreviations" | "methods", readonly string[]> {
    return {
      abbreviations: Array.from(abbreviations.keys()),
      methods: AUTH_TYPES
    };
  }

  private getMethod(): [boolean, { [key: string]: unknown; method: string; body: unknown }] {
    if ((AUTH_TYPES as unknown as string[]).includes(this._method)) {
      return [true, { body: null, method: this._method }];
    }

    const abbreviation = abbreviations.get(this._method); 
    if (abbreviation) {
      return [true, { body: null, method: abbreviation }];
    };

    return [
      false,
      {
        body: {
          msg: "Sorry, but method " + this._method + " not found. Try next:",
          methods: AUTH_TYPES
        },
        method: this._method
      }
    ];
  }

  public auth(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) {
      return res.send(body)
    };

    return passport.authenticate(method)(req, res, next);
  }

  public callback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    callback: (...args: [unknown, Auth | null, unknown]) => unknown
  ): unknown {
    const [successed, { method, body }] = this.getMethod();

    if (!successed) {
      return res.send(body)
    };

    return passport.authenticate(method, callback)(req, res, next);
  }
}

export default AuthApi;
