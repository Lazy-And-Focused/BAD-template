
import { Test } from "@nestjs/testing";
import { Controller } from "./test.controller";
import { ROUTE, ROUTES } from "./test.routes";

describe(ROUTE + " controller", () => {
  let controller: Controller;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [Controller],
    }).compile();

    controller = moduleRef.get(Controller);
  });

  describe("GET " + ROUTES.GET_PUBLIC, () => {
    it("should return an array of ", async () => {
      const result = "Hi from public test";

      expect(controller.getPublic()).toBe(result);
    });
  });
});
