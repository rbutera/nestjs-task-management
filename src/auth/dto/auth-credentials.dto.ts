import {
  IsNotEmpty,
  IsDefined,
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator'

export class AuthCredentialsDto {
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  username: string

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password too weak. Requires at least one uppercase letter, at least one lowercase letter, and at least one number and/or special character.',
  })
  password: string
}
