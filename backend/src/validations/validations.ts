import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function AtLeastOneContact(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "atLeastOneContact",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as any;
          return (
            !!obj.telegram?.trim() ||
            !!obj.linkedin?.trim() ||
            !!obj.discord?.trim()
          );
        },
        defaultMessage(args: ValidationArguments) {
          return "Потрібно вказати хоча б один контакт: Telegram, LinkedIn або Discord";
        },
      },
    });
  };
}
