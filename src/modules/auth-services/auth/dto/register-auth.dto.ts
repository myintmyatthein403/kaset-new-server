import { IsString, IsNotEmpty } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
