import "reflect-metadata";

import { Type } from 'class-transformer';

import { MongoIDType, MongoID } from './decorators/mongo'

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
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  password: IPassword;
  children: IChild[];
};

export class Password implements IPassword {
  @MongoIDType()
  public id: MongoID
  public value: string
  public expire_at: Date
}

export class Child implements IChild {
  @MongoIDType()
  public id: MongoID
  public name: string
  public age: number
}

export class User implements IUser {
  @MongoIDType()
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