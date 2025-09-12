import { Module } from "@nestjs/common";

import { Controller } from "./<%= name %>.controller";
import { Service } from "./<%= name %>.service";

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service]
})
export default class <%= classify(name) %>Module {}
