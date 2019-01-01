import { Type, Transform, Expose } from 'class-transformer';
import { ObjectID } from 'mongodb';

/**
 * Combines @Transform then @Type decorators.
 */
export const MongoIDType = () => {
  const transformFn = Transform((value: string, obj: any) => new ObjectID(obj.id || obj._id), { toClassOnly: true });
  const typeFn = Type(() => String);
  const exposeFn = Expose({ name: "id"});

  return function (target: any, key: string) {
    typeFn(target, key);
    transformFn(target, key);
    exposeFn(target, key);
  }
}

export type MongoID = typeof ObjectID