import { passwordFactory, userFactory } from './fake/factory';

import { User, Password, IPassword, IUser, IChild, Child } from './user.model';

import { plainToClass } from 'class-transformer';

import util from 'util';

describe('Test factory.js usage', async () => {
  it('should return passwords as instances of Password', async () => {
    const password: IPassword = new Password();
    password.id = 3;
    password.value = "234234";
    password.expire_at = new Date();

    const jsonPassword = { id: 3, value: "234234", date: new Date() };

    expect(password).toBeInstanceOf(Password)
    expect(await passwordFactory.build()).toBeInstanceOf(Password)
    expect(plainToClass(Password, jsonPassword)).toBeInstanceOf(Password)
  });

  it('should return users as instances of User', async () => {
    const password: IPassword = new Password();
    password.id = 3;
    password.value = "234234";
    password.expire_at = new Date();

    const user: IUser = new User();
    user.id = 3;
    user.firstName = "José";
    user.lastName = "Silva";
    user.fullName = "José Silva";
    user.age = 23;
    user.password = password;

    const jsonPassword = { id: 3, value: "234234", date: new Date() };
    const jsonUser = { id: 3, value: "234234", date: new Date(), password: jsonPassword };

    expect(user).toBeInstanceOf(User)
    expect(await userFactory.build()).toBeInstanceOf(User)
    expect(plainToClass(User, jsonUser)).toBeInstanceOf(User)

    expect(user.password).toBeInstanceOf(Password)
    expect((await userFactory.build()).password).toBeInstanceOf(Password)
    expect(plainToClass(Password, jsonUser.password)).toBeInstanceOf(Password)

    console.log('Children: ', util.inspect(await userFactory.buildList(4), { depth: null }));
  });
});