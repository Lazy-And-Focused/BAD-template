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
        │       │   └── ROUTE-$DTO_NAME.dto.ts
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
            ├── promise/...                             # ? types/promise/
            ├── $TYPE_NAME.types.ts
            ├── response.types.ts
            ├── auth.types.ts
            └── index.ts
```

- ? - Не обязательный файл/папка

- `routes/:route/` — Не генерировать в ручную, использовать: `nest g bad $ROUTE`.
- `.routes` — Обязательный файл для расписывания URL запросов и их методов.
- `/:route/:subroute` — Копия `$ROUTE`, максимум до 3-4 вложеностей.
- `services` — Можно заменить на `api/`, также можно создать `index.ts`.
- `types/promise/` — Копия `types/`, только все типу обёрнуты в `Promise`

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

Основной файл, в котором будет хранится логика конкретного роутера. Для удобства можно использовать API других сервисов, создав `/api` и перенеся часть из логики сервива туда. Например:

- Это:

```ts
import env from "@env";

export class Service {
    public async get(token: string, profileId: string) {
        try {
            const data = await (await fetch(env.GOOGLE_API_URL + "/people/" + profileId, {
                method: "GET",
                headers: { Authorization: token }
            })).json();

            return {
                successed: true,
                data,
                error: null
            }
        } catch (error) {
            console.error(error);
            
            return {
                succssed: false,
                data: null,
                error: (error instanceof Error) ? error.message : "some error"
            };
        }
    }
}
```

- Превратится в это:

```ts
import GoogleApi from "api/google";

export class Service {
    public get(token: string, profileId: string) {
        return new GoogleApi(token).get(profileId);
    }

    // ...
}

export default Service;
```

### `$ROUTE.controller.ts`

Файл, который будет валидировать запросы пользователя и др. Вот пример сгенерированного файла:

```ts
import type { UsersCreateDto } from "./dto/users-create.dto";
import type { UsersUpdateDto } from "./dto/users-update.dto";

import { Public } from "decorators/public.decorator";
import { AuthGuard } from "guards/auth/auth.guard";

import {
  Controller as NestController,
  Injectable,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  UseGuards,
  HttpStatus
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ROUTE, ROUTES } from "./users.routes";
import { Service } from "./users.service.ts"

@Injectable()
@NestController(ROUTE)
@UseGuards(AuthGuard)
export class Controller {
  public constructor(
    private readonly service: Service
  ) {}

  @ApiOperation({
    summary: "Getting an array of users"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET)
  @Public()
  public get() {
    return this.service.get()
  }

  @ApiOperation({
    summary: "Getting a users by id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET_ONE)
  @Public()
  public getOne(
    @Param("id") id: string
  ) {
    return this.service.getOne(id);
  }

  @ApiOperation({
    summary: "Creaing a users"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created"
  })
  @Post(ROUTES.POST)
  public post(
    @Body() data: UsersCreateDto 
  ) {
    return this.service.post(data);
  }

  @ApiOperation({
    summary: "Updating a users"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated"
  })
  @Put(ROUTES.PUT)
  public put(
    @Param("id") id: string,
    @Body() data: UsersUpdateDto 
  ) {
    return this.service.put(id, data);
  }

  @ApiOperation({
    summary: "Updating a users"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated"
  })
  @Patch(ROUTES.PUT)
  public patch(
    @Param("id") id: string,
    @Body() data: UsersUpdateDto 
  ) {
    return this.service.patch(id, data);
  }
  
  @ApiOperation({
    summary: "Deleting a users"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Deleted"
  })
  @Delete(ROUTES.DELETE)
  public delete(
    @Param("id") id: string
  ) {
    return this.service.delete(id);
  }
}
```

### `$ROUTE.module.ts`

Это модуль, который будет экспортироваться в общих роутер

### `nest-cli.json`

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "bad-fockarch",
  "sourceRoot": "./src",
  "language": "ts",
  "root": "./",
  "generateOptions": {
    "baseDir": "routes",
    "spec": {
      "controller": true,
      "service": true,
      "module": false
    }
  },
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

## Code style

Читайте [LAF/Docs](https://docs.laf-team.ru/agreements/general)
