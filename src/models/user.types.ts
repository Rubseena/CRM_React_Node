export interface User {
  isLogged: boolean;
  userData: {
    jwt: string;
    username: string;
    expireTime: number;
  };
  userInfo: any; //FIXME: might go inside userdata key.

  error: string;
}

export interface UserSignInInformation {
  username: string;
  password: string;
}
