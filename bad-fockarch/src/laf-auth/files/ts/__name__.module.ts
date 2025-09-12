import { Module } from "@nestjs/common";

import { Controller } from "./<%= name %>.controller";

@Module({
  imports: [],
  controllers: [Controller],
  providers: []
})
export default class <%= classify(name) %>Module {}
