# BAD Архитектура

Backend After Drinking (Бэкенд после пьянки)

## Архитектура

```txt
└── $WORK_FOLDER/
    ├── .gitignore
    ├── .prettierrc
    ├── eslint.config.mjs
    ├── LICENSE
    ├── nest-cli.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── README.md
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── test/
    │   ├── app.e2e-test.ts
    │   └── jest-e2e.json
    └── src/
        ├── app.module.ts
        ├── main.ts
        ├── app/
        │   └── session.app.ts
        ├── database/
        │   │── schemas/
        |   |   └── $SHEMA_NAME.schema.ts
        │   └── index.ts
        ├── decorators/
        │   ├── $DECORATOR_NAME.decorator.ts
        │   └── public.decorator.ts
        ├── guards/
        │   ├── auth/
        │   │   ├── auth-guard.service.ts
        │   │   └── auth.guard.ts
        │   └── $GUARD_NAME/
        │       ├── $GUARD_NAME-guard.service.ts
        │       └── $GUARD_NAME.guard.ts
        │── middleware/
        │   ├── $MIDDLEWARE_NAME.middleware.ts
        │   └── logger.middleware.ts
        │── routes/
        │   ├── auth/
        │   │   ├── auth.controller.ts
        │   │   ├── auth.module.ts
        │   │   └── auth.routes.ts
        │   └── $ROUTE/                                 # routes/:route/
        │       ├── dto/
        │       │   └── $DTO_NAME-$ROUTE.dto.ts
        │       ├── entities/                           # !
        │       │   └── $ROUTE.entity.ts
        │       ├── $ROUTE.controller.test.ts
        │       ├── $ROUTE.controller.ts
        │       ├── $ROUTE.service.test.ts
        │       ├── $ROUTE.service.ts
        │       ├── $ROUTE.module.ts
        │       ├── $ROUTE.routes.ts                    # .routes
        │       └── $SUB_ROUTE/...                      # /:route/:subroute
        ├── services/                                   # services
        │   ├── auth.service.ts
        │   ├── env.service.ts
        │   ├── hash.service.ts
        |   ├── $SERVICE_NAME.service.ts
        ├── strategies/
        │   ├── authenticator.ts
        │   ├── general.stategy.ts
        │   └── index.ts
        └── types/
            ├── $TYPE_NAME.types.ts
            ├── auth.types.ts
            └── index.ts
```

- ! - Не обязательный файл/папка

- `routes/:route/` — Не генирировать в ручную: `nest g resource $ROUTE/$ROUTE`, и не забыть про `$ROUTE.routes.ts`.
- `.routes` — Обязательный файл для расписывания URL запросов и их методов.
- `/:route/:subroute` — Копия `$ROUTE`, максимум до 3-4 вложеностей.
- `services` — Можно заменить на `api/`, также можно создать `index.ts`.

Роуты могут иметь максимум 3-4 вложенности.

### `$ROUTE.routes.ts`

Файл в котором будут основные пути для контроллера. Следует следовать следующему паттерну:

```ts
/* 
    ROUTE — Константа, которая будет хранить путь до контроллера.
*/
const ROUTE: string | string[] = "/";

/*
    ROUTES — Объект, который будет хранить пути по определенным методам, например:

    `ROUTES.GET` — Мы используем GET метод и получаем по этому методу его путь.
    `ROUTES.GET_ONE` — Тоже самое, как GET, но получается вместо списка всего одну сущность.
*/
const ROUTES: Record<string, string> = {
    "GET": "/",
    "GET_ONE": "/:id",
    "POST": "/",
    "PUT": "/:id",
    "PATCH": "/:id",
    "DELETE": "/:id",
};
```

### `$ROUTE.service.ts`

Основной файл, в котором будет хранится логика конкретного роутера. Для удобства можно использовать API других сервисов, создав `/api` и перенеся часть логики туда. Например:

```ts
import GoogleApi from "api/google";

export class Service {
    public get(profileId: string, token: string) {
        return new GoogleApi(token).get(profileId);
    }

    // ...
}

export default Service;
```

### `$ROUTE.controller.ts`

Файл, который будет кэшировать запросы с `./$ROUTE.service`, валидировать запросы пользователя и др.

```ts
import type { NextFunction, Request, Response } from "express";

import { Controller, Get, Inject, Injectable, Next, Req, Res } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { Cache } from "cache-manager";

import { Service } from "./${routeName}.service";

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class ProjectController {
    public constructor(
        private readonly service: Service,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    @ApiOperation({ summary: "some summary", description: "some description" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "some description"
    })
    @Get(ROUTES.GET)
    public async get(
        @Req() req: Request, // Если не используется, можно не указывать
        @Res() res: Response, // Если не используется, можно не указывать
    ): { /* ... */ } {
        // ...some code...

        return { /* ... */ };
    }
}

export default ProjectController;
```

### `$ROUTE.module.ts`

Это модуль, который будет экспортироваться в общих роутер

### `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "./src",
  "language": "ts",
  "root": "./",
  "generateOptions": {
    "baseDir": "routes",
    "flat": true,
    "spec": true
  },
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

## Code style

Читайте [LAF/Docs](https://docs.laf-team.ru/agreements/general)
