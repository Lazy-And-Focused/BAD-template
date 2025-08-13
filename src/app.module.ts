import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { RouterModule } from "@nestjs/core";

import AuthModule from "./routes/auth/auth.module";

@Module({
  imports: [
    AuthModule,
  ].flatMap((module) => [module, RouterModule.register([{ path: "api", module }])])
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
