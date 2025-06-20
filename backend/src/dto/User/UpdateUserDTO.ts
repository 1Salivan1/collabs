import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Ім'я користувача має бути рядком" })
  @MinLength(3, { message: "Ім'я користувача має бути не менше 3 символів" })
  username?: string;

  @IsOptional()
  @IsString({ message: "Про себе має бути рядком" })
  about?: string;

  @IsOptional()
  @IsString({ message: "Telegram має бути рядком" })
  telegram?: string;

  @IsOptional()
  @IsString({ message: "LinkedIn має бути рядком" })
  linkedin?: string;

  @IsOptional()
  @IsString({ message: "Discord має бути рядком" })
  discord?: string;

  @IsOptional()
  @IsString({ message: "URL аватару має бути рядком" })
  avatarUrl?: string;
}