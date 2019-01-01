import faker from 'faker';

import { Async } from 'factory.ts';
import { plainToClass } from 'class-transformer';

import { User, Password, IPassword, IUser, IChild, Child } from '../model/user';
import { ObjectID } from 'mongodb';

export const passwordFactory = Async.makeFactory<IPassword>({
  id: Async.each(() => new ObjectID()),
  value: Async.each(() => faker.internet.password()),
  expire_at: Async.each(() => faker.date.between('2019-01-01', '2020-12-31')),
}).transform((pass: IPassword) => plainToClass(Password, pass));

export const childFactory = Async.makeFactory<IChild>({
  id: Async.each(() => new ObjectID()),
  name: Async.each(() => faker.name.firstName()),
  age: Async.each(() => faker.random.number({ min: 0, max: 10 })),
}).transform((child: IChild) => plainToClass(Child, child));

export const userFactory = Async.makeFactory<User>({
  _id: Async.each(() => new ObjectID()),
  firstName: Async.each(() => faker.name.firstName()),
  lastName: Async.each(() => faker.name.lastName()),
  fullName: Async.each(() => faker.name.findName()),
  age: Async.each(() => faker.random.number({ min: 10, max: 50 })),
  password: Async.each(() => passwordFactory.build()),
  children: Async.each(() => childFactory.buildList(faker.random.number({ min: 1, max: 3 })))
}).transform((user: User) => plainToClass(User, user));