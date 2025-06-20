import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { AtLeastOneContact } from "../../validations/validations";

export class CreateUserDto {
  @IsNotEmpty({ message: "Ім'я користувача не може бути порожнім" })
  @MinLength(2, { message: "Мінімум 2 символа" })
  username!: string;

  @IsEmail({}, { message: "Некоректний email" })
  email!: string;

  @IsNotEmpty({ message: "Пароль не може бути порожнім" })
  @MinLength(6, { message: "Мінімум 6 символів" })
  password!: string;

  @IsNotEmpty({ message: "Опис не може бути порожнім" })
  @MinLength(20, { message: "Мінімум 20 символів" })
  about!: string;

  @IsOptional()
  @IsString({ message: "Telegram має бути рядком" })
  telegram?: string;

  @IsOptional()
  @IsString({ message: "LinkedIn має бути рядком" })
  linkedin?: string;

  @IsOptional()
  @IsString({ message: "Discord має бути рядком" })
  discord?: string;

  @ArrayNotEmpty({ message: "Додайте хоча б один тег" })
  tags!: number[];

  @AtLeastOneContact({ message: "Потрібно вказати хоча б один контакт" })
  contactCheck?: string;
}
