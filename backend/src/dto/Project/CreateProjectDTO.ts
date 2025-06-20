import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { AtLeastOneContact } from "../../validations/validations";

export class CreateProjectDto {
  @IsNotEmpty({ message: "Назва проєкту не має бути порожньою" })
  @MinLength(2, { message: "Назва має бути більше ніж 2 символа" })
  title!: string;

  @IsNotEmpty({ message: "Текст не має бути порожнім" })
  @MinLength(50, { message: "Текст не має бути не менше ніж 50 символів" })
  text!: string;

  @IsOptional()
  @IsString({ message: "Telegram має бути рядком" })
  telegram?: string;

  @IsOptional()
  @IsString({ message: "LinkedIn має бути рядком" })
  linkedin?: string;

  @IsOptional()
  @IsString({ message: "Discord має бути рядком" })
  discord?: string;

  @AtLeastOneContact({
    message: "Потрібно вказати хоча б один контакт"
  })
  contactCheck?: string;

  @IsNotEmpty({ message: "Додайте хоча б один тег" })
  @IsArray()
  @ArrayMinSize(1, { message: "Додайте хоча б один тег" })
  tags!: number[];

  @IsNotEmpty({ message: "У проєкту має бути творець" })
  creator_id!: string;
}
