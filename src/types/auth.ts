export interface SignupData {
  email: string;
  password: string;
}

export interface SignupResponse {
  data: {
    accessToken: string;
    user: {
      userProfile: any;
      role: 'admin' | 'user';
      username:string,
      id:string
    };
  };
}

export interface ErrorResponse{
  code:string
}