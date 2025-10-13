import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { RouterModule } from "@nestjs/core";

import v1Module, { v1Modules } from "./v1/v1.module";

const modules: Array<[new () => NestModule, (new () => unknown)[]]> = [
  [v1Module, v1Modules]
];

@Module({
  imports: [
    ...modules.flatMap(([module, children]) => [
      module,
      RouterModule.register([{
        path: "api",
        module,
        children: children.flatMap((child) => [{path: "v1", module: child}])
      }]),
    ]),
  ]
})
export default class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes("/");
  }
}
