import faker from 'faker';

import { Async } from 'factory.ts';
import { plainToClass } from 'class-transformer';

import { User, Password, IPassword, IUser, IChild, Child } from '../user.model';

export const passwordFactory = Async.makeFactory<IPassword>({
  id: Async.each(() => faker.random.number({ min: 10000, max: 100000 })),
  value: Async.each(() => faker.internet.password()),
  expire_at: Async.each(() => faker.date.between('2019-01-01', '2020-12-31')),
}).transform((pass: IPassword) => plainToClass(Password, pass));

export const childFactory = Async.makeFactory<IChild>({
  id: Async.each(() => faker.random.number({ min: 10000, max: 100000 })),
  name: Async.each(() => faker.name.firstName()),
  age: Async.each(() => faker.random.number({ min: 0, max: 10 })),
}).transform((child: IChild) => plainToClass(Child, child));

export const userFactory = Async.makeFactory<IUser>({
  id: Async.each(() => faker.random.number({ min: 10000, max: 100000 })),
  firstName: Async.each(() => faker.name.firstName()),
  lastName: Async.each(() => faker.name.lastName()),
  fullName: Async.each(() => faker.name.findName()),
  age: Async.each(() => faker.random.number({ min: 10, max: 50 })),
  password: Async.each(() => passwordFactory.build()),
  children: Async.each(() => childFactory.buildList(faker.random.number({ min: 1, max: 3 })))
}).transform((user: IUser) => plainToClass(User, user));