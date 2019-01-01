import { passwordFactory, userFactory } from './fake/factory';
import { User, Password, IPassword, IUser, IChild, Child } from './model/user';

import { plainToClass, classToClass } from 'class-transformer';
import { ObjectID } from 'mongodb';

import util from 'util';

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

    expect(password.id).toBeInstanceOf(ObjectID)
    expect(plainToClass(Password, jsonPassword).id).toBeInstanceOf(ObjectID)
    expect((await passwordFactory.build()).id).toBeInstanceOf(ObjectID)
  });

  it('should return users as instances of User', async () => {
    const password: Password = new Password();
    password.id = new ObjectID();
    password.value = "234234";
    password.expire_at = new Date();

    const child: Child = new Child();
    child.id = new ObjectID();
    child.name = "Jessica";
    child.age = 3;

    const user: User = new User();
    user._id = new ObjectID();
    user.firstName = "José";
    user.lastName = "Silva";
    user.fullName = "José Silva";
    user.age = 23;
    user.password = password;

    const jsonPassword = { id: new ObjectID(), value: "234234", date: new Date() };
    const jsonUser = { id: new ObjectID(), value: "234234", date: new Date(), password: jsonPassword, children: [child] };
    const jsonUser2 = { _id: new ObjectID(), value: "234234", date: new Date(), password: jsonPassword, children: [child] };

    expect(user).toBeInstanceOf(User)
    expect(await userFactory.build()).toBeInstanceOf(User)
    expect((await userFactory.build()).id).toBeInstanceOf(ObjectID)

    expect(plainToClass(User, jsonUser)).toBeInstanceOf(User)
    expect(plainToClass(User, jsonUser).id).toBeUndefined()
    expect(classToClass(plainToClass(User, jsonUser)).id).toBeInstanceOf(ObjectID)
    expect(classToClass(plainToClass(User, jsonUser)).id).toEqual(jsonUser.id)
    expect(classToClass(plainToClass(User, jsonUser))._id).toBeUndefined()

    expect(plainToClass(User, jsonUser2)).toBeInstanceOf(User)
    expect(plainToClass(User, jsonUser2).id).toBeUndefined()
    expect(classToClass(plainToClass(User, jsonUser2)).id).toBeInstanceOf(ObjectID)
    expect(classToClass(plainToClass(User, jsonUser2)).id).toEqual(jsonUser2._id)
    expect(classToClass(plainToClass(User, jsonUser2))._id).toBeUndefined()

    expect(user.password).toBeInstanceOf(Password)
    expect((await userFactory.build()).password).toBeInstanceOf(Password)
    expect(plainToClass(Password, jsonUser.password)).toBeInstanceOf(Password)
    expect(plainToClass(Password, jsonUser.password).id).toBeInstanceOf(ObjectID)

    expect((await userFactory.build()).children[0]).toBeInstanceOf(Child)
    expect(((await userFactory.build()).children[0]).id).toBeInstanceOf(ObjectID)
    expect(plainToClass(User, jsonUser).children[0].id).toBeInstanceOf(ObjectID)
  });

  it('should order several users by id using ramda', async () => {
    
  });
});