import { IsUUID } from "class-validator";

export class BaseAssociation {
  @IsUUID()
  id: string
}
