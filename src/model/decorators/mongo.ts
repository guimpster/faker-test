import { Type, Transform } from 'class-transformer';
import { ObjectID } from 'mongodb';

/**
 * Combines @Transform then @Type decorators.
 */
export const MongoIDType = () => {
  const transformFn = Transform((value: string) => new ObjectID(value), { toClassOnly: true });
  const typeFn = Type(() => String);

  return function (target: any, key: string) {
    typeFn(target, key);
    transformFn(target, key);
  }
}

export type MongoID = typeof ObjectID