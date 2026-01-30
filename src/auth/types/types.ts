export interface IUserStructure {
  _id: string;
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserCreate {
  email: string;
  password: string;
  username: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export type AuthResponseBody = {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
};

export interface ResponseBodyError {
  error: string;
}
