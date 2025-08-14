import type { Create<%= classify(name) %> } from "@types/<%= name %>.types";

import { ApiProperty } from "@nestjs/swagger";

export class <%= classify(name) %>CreateDto implements Create<%= classify(name) %> {

}