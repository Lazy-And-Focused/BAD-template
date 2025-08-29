import type { <%= classify(name) %> } from "types/<%= name %>.types";
import type { ServiceResponse } from "types/promise/response.types";

import type { <%= classify(name) %>CreateDto } from "./dto/<%= name %>-create.dto";
import type { <%= classify(name) %>UpdateDto } from "./dto/<%= name %>-update.dto";

import { Injectable } from "@nestjs/common";

@Injectable()
export class Service {
  public async get(): ServiceResponse<<%= classify(name) %>[]> {
    return {
      successed: true,
      data: [],
      error: null
    };
  }

  public async getOne(id: string): ServiceResponse<<%= classify(name) %>> {
    return {
      successed: true,
      data: {},
      error: null
    };
  }

  public async post(data: <%= classify(name) %>CreateDto): ServiceResponse<<%= classify(name) %>> {
    return {
      successed: true,
      data: {},
      error: null
    };
  }

  public async put(id: string, data: <%= classify(name) %>UpdateDto): ServiceResponse<<%= classify(name) %>> {
    return {
      successed: true,
      data: {},
      error: null
    };
  }

  public async patch(id: string, data: <%= classify(name) %>UpdateDto): ServiceResponse<<%= classify(name) %>> {
    return {
      successed: true,
      data: {},
      error: null
    };
  }

  public async delete(id: string): ServiceResponse<string> {
    return {
      successed: true,
      data: "deleted",
      error: null
    };
  }
}