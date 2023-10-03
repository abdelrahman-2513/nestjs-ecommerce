import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueEmailConstraints } from 'src/user/validators/is-unique-email.validator';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUniqueEmailConstraints,
    });
  };
}
