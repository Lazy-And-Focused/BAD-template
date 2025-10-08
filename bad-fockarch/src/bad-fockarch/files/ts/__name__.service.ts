import type { <%= classify(name) %> } from "types/<%= name %>.types";

import type { <%= classify(name) %>CreateDto } from "./dto/<%= name %>-create.dto";
import type { <%= classify(name) %>UpdateDto } from "./dto/<%= name %>-update.dto";

import { Injectable } from "@nestjs/common";

@Injectable()
export class Service {
  public async get(): Promise<<%= classify(name) %>[]> {
    return [];
  }

  public async getOne(id: string): Promise<<%= classify(name) %>> {
    return {};
  }

  public async post(data: <%= classify(name) %>CreateDto): Promise<<%= classify(name) %>> {
    return {};
  }

  public async put(id: string, data: <%= classify(name) %>UpdateDto): Promise<<%= classify(name) %>> {
    return {};
  }

  public async patch(id: string, data: <%= classify(name) %>UpdateDto): Promise<<%= classify(name) %>> {
    return {};
  }

  public async delete(id: string): Promise<string> {
    return "deleted";
  }
}