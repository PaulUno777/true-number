import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmail,
  isPhoneNumber,
} from 'class-validator';

export function IsLogin(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLogin',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const trimmed = value.trim();
          return isEmail(trimmed) || isPhoneNumber(trimmed);
        },
        defaultMessage(args: ValidationArguments) {
          return `'${args.value}' is not a valid email or phone number`;
        },
      },
    });
  };
}
