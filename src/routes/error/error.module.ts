import { Module } from "@nestjs/common";
import { Controller } from "./error.controller";

@Module({
  controllers: [Controller],
})
export class ErrorModule {}

export default ErrorModule;
