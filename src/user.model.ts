export interface IPassword {
  id: number;
  value: string;
  expire_at: Date;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  password: IPassword;
  children: IChild[];
};

export interface IChild {
  id: number
  name: string
  age: number
}

export class Password implements IPassword {
  public id: number
  public value: string
  public expire_at: Date
}

export class Child implements IChild {
  public id: number
  public name: string
  public age: number
}

export class User implements IUser {
  public id: number
  public firstName: string
  public lastName: string
  public fullName: string
  public age: number
  public password: IPassword
  public children: IChild[]
}