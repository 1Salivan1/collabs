import {
    IsArray,
    IsOptional,
    IsString,
    MinLength,
    IsInt,
  } from "class-validator";
  
  export class UpdateProjectDto {
    @IsOptional()
    @IsString({ message: "Назва має бути рядком" })
    @MinLength(2, { message: "Назва має бути більше ніж 2 символа" })
    title?: string;
  
    @IsOptional()
    @IsString({ message: "Текст має бути рядком" })
    @MinLength(50, { message: "Текст має бути не менше ніж 50 символів" })
    text?: string;
  
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
    @IsArray({ message: "Теги мають бути масивом" })
    tags?: number[];
  
    @IsOptional()
    @IsInt({ message: "creator_id має бути числом" })
    creator_id?: number;
  }
  