import "reflect-metadata";

import { ObjectID } from 'mongodb';
import { Type, Transform } from 'class-transformer';
import { plainToClass } from "class-transformer";

export type MongoID = typeof ObjectID

export interface IPassword {
  id: MongoID;
  value: string;
  expire_at: Date;
}

export interface IChild {
  id: MongoID
  name: string
  age: number
}

export interface IUser {
  id: MongoID;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  password: IPassword;
  children: IChild[];
};

export class Password implements IPassword {
  @Type(() => String)
  @Transform((value: string) => new ObjectID(value), { toClassOnly: true })
  public id: MongoID
  public value: string
  public expire_at: Date
}

export class Child implements IChild {
  @Type(() => String)
  @Transform((value: string) => new ObjectID(value), { toClassOnly: true })
  public id: MongoID
  public name: string
  public age: number
}

export class User implements IUser {
  @Type(() => String)
  @Transform((value: string) => new ObjectID(value), { toClassOnly: true })
  public id: MongoID
  public firstName: string
  public lastName: string
  public fullName: string
  public age: number
  @Type(() => Password)
  public password: IPassword
  @Type(() => Child)
  public children: IChild[]
}