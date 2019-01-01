import "reflect-metadata";

import { ObjectID } from 'mongodb';
import { Type } from 'class-transformer';

export type MongoID = typeof ObjectID

export interface IPassword {
  id: MongoID;
  value: string;
  expire_at: Date;
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

export interface IChild {
  id: MongoID
  name: string
  age: number
}

export class Password implements IPassword {
  @Type(() => String)
  public id: MongoID
  public value: string
  public expire_at: Date
}

export class Child implements IChild {
  @Type(() => String)
  public id: MongoID
  public name: string
  public age: number
}

export class User implements IUser {
  @Type(() => String)
  public id: MongoID
  public firstName: string
  public lastName: string
  public fullName: string
  public age: number
  public password: IPassword
  public children: IChild[]
}