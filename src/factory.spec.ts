import { passwordFactory, userFactory } from './fake/factory';

import { User, Password, IPassword, IUser, IChild, Child } from './model/user';

import { plainToClass } from 'class-transformer';

import util from 'util';

import { ObjectID } from 'mongodb';

describe('Test factory.js usage', async () => {
  it('should return passwords as instances of Password', async () => {
    const password: IPassword = new Password();
    password.id = new ObjectID();
    password.value = "234234";
    password.expire_at = new Date();

    const jsonPassword = { id: new ObjectID(), value: "234234", date: new Date() };

    expect(password).toBeInstanceOf(Password)
    expect(await passwordFactory.build()).toBeInstanceOf(Password)
    expect(plainToClass(Password, jsonPassword)).toBeInstanceOf(Password)
    expect((await passwordFactory.build()).id).toBeInstanceOf(ObjectID)
  });

  // it('should return users as instances of User', async () => {
  //   const password: IPassword = new Password();
  //   password.id = new ObjectID();
  //   password.value = "234234";
  //   password.expire_at = new Date();

  //   const user: IUser = new User();
  //   user.id = new ObjectID();
  //   user.firstName = "José";
  //   user.lastName = "Silva";
  //   user.fullName = "José Silva";
  //   user.age = 23;
  //   user.password = password;

  //   const jsonPassword = { id: new ObjectID(), value: "234234", date: new Date() };
  //   const jsonUser = { id: new ObjectID(), value: "234234", date: new Date(), password: jsonPassword };

  //   expect(user).toBeInstanceOf(User)
  //   expect(await userFactory.build()).toBeInstanceOf(User)
  //   expect(plainToClass(User, jsonUser)).toBeInstanceOf(User)

  //   expect(user.password).toBeInstanceOf(Password)
  //   expect((await userFactory.build()).password).toBeInstanceOf(Password)
  //   expect(plainToClass(Password, jsonUser.password)).toBeInstanceOf(Password)
  //   expect((await userFactory.build()).children[0]).toBeInstanceOf(Child)
  // });
});