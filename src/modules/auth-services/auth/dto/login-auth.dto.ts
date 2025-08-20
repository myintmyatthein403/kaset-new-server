import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsBoolean()
  readonly rememberMe?: boolean = false
}
