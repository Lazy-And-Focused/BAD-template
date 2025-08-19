# Архитектура

> [!NOTE] Данная структура будет перемещана на стиль `lafistory` в
> будущем.

## Описание

Данная структура строгая и не позволяет убирать некоторые папки,
однако такие есть. Пройдёмся по всем:

- Файлы-конфигураторы:
  - `.gitignore` — Можно изменять.
  - `.prettierc` — Можно изменять.
  - `eslint.config.mjs` — Можно изменять.
  - `nest-cli.json` — Лучше не трогать.
  - `tsconfig.json` — Лучше не трогать.
  - `tsconfig.build.json` — Лучше не трогать.

- Категории:
  - `src/` (`~/`) — Обязательная категория со всем исходным кодом.
  - `~/app/` — категории с приложением. (В будущем может поменяться)
  - `~/database/` — Категория с логикой БД, можно изменять под свои
    нужды.
  - `~/decorators/` — Категория с декораторами, если требуется
    использовать сервисы, то можно изменить под свои нужды. (Сделать
    как в )
  - `~/guards/` — Категория с "защитниками", можно изменять под свои
    нужды.
  - `~/middleware/` — Также можно изменять под свои нужды.
  - `~/routes/` — Категория роутов, лучше не трогать и подключать
    модули через импорт. (Разрешаю сделать `deployer`)
  - `~/services/` — Категория с дополнительными сервисами/API других
    приложений или локальных модулей, фактически полная свобода, но
    лучше придерживаться единому стилю.
  - `~/api/` — Аналогичная категория к `~/services/`, лучше не
    использовать две этих категории в одном приложении.
  - `~/strategies/` — Категория со стратегией аутентификации. (В
    будущем мигрирует в `~/app/`)
  - `~/types/` — Категория с сущностями приложения, можно использовать
    `~/entities/`.
    - `~/types/promise/` — Копия родительской категории, только с
      `Promise` типами.
  - `~/entities/` — Аналогичная категория к `~/types/`, лучше не
    использовать две эти категории в одном приложении.

## Структура

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

- `routes/:route/` — Не генерировать в ручную, использовать:
  `nest g bad $ROUTE`.
- `.routes` — Обязательный файл для расписывания URL запросов и их
  методов.
- `/:route/:subroute` — Копия `$ROUTE`, максимум до 3-4 вложеностей.
- `services` — Можно заменить на `api/`, также можно создать
  `index.ts`.
- `types/promise/` — Копия `types/`, только все типу обёрнуты в
  `Promise`

Роуты могут иметь максимум 3-4 вложенности.
