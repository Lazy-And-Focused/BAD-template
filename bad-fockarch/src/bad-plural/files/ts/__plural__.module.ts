import { Module } from "@nestjs/common";

import { Controller } from "./<%= plural %>.controller";
import { Service } from "./<%= plural %>.service";

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service]
})
export default class <%= classify(plural) %>Module {}
