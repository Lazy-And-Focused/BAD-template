import type { NestModule, MiddlewareConsumer } from "@nestjs/common";

import { Module } from "@nestjs/common";

import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from "@nestjs/core";
import { CacheModule, CacheInterceptor } from "@nestjs/cache-manager";
import { SentryGlobalFilter, SentryModule as Sentry } from "@sentry/nestjs/setup";

import { LoggerMiddleware } from "./middleware/logger.middleware";

import AuthModule from "./routes/auth/auth.module";
import SentryModule from "./routes/sentry/sentry.module";

@Module({
  imports: [
    ...[AuthModule, SentryModule].flatMap((module) => [
      module,
      RouterModule.register([{ path: "api", module }]),
    ]),
    CacheModule.register({
      ttl: 5 * 60 * 1000, // 5 minutes
      isGlobal: true,
    }),
    Sentry.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    }
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}

export default AppModule;
