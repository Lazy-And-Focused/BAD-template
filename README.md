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
    │   ├── app.e2e-spec.ts
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
        │   ├── deployer.ts
        │   ├── index.ts
        │   ├── auth/
        │   │   ├── auth.controller.ts
        │   │   ├── auth.module.ts
        │   │   └── auth.routes.ts
        │   └── $ROUTE/
        │       ├── dto/
        │       │   └── $DTO_NAME.dto.ts
        │       ├── $ROUTE.controller.spec.ts
        │       ├── $ROUTE.controller.ts
        │       ├── $ROUTE.service.ts
        │       ├── $ROUTE.module.ts
        │       ├── $ROUTE.routes.ts
        │       └── $SUB_ROUTE/
        │           ├── dto/
        │           │   └── $DTO_NAME.dto.ts
        │           ├── $SUB_ROUTE.controller.spec.ts
        │           ├── $SUB_ROUTE.controller.ts
        │           ├── $SUB_ROUTE.service.ts
        │           ├── $SUB_ROUTE.module.ts
        │           └── $SUB_ROUTE.routes.ts
        ├── services/
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

Роуты могут иметь максимум 3-4 вложенности.

### $ROUTE.routes.ts

Файл в котором будут основные пути для контроллера. Следует следовать следующему паттерну:

```ts
/* 
    ROUTE — Константа, которая будет хранить путь до контроллера.
*/
const ROUTE: string | string[] = "/" //

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

### $ROUTE.service.ts

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

### $ROUTE.controller.ts

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

### $ROUTE.module.ts

Это модуль, который будет экспортироваться в общих роутер

## Code style

Читайте [LAF/Docs](https://docs.laf-team.ru/agreements/general)
