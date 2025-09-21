import { Module } from "@nestjs/common";
import { Controller } from "./sentry.controller";

@Module({
  controllers: [Controller],
})
export class SentryModule {}

export default SentryModule;
