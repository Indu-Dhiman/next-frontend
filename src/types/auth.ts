export interface SignupData {
  email: string;
  password: string;
}

export interface SignupResponse {
  data: {
    accessToken: string;
    user: {
      role: 'admin' | 'user';
    };
  };
}

export interface ErrorResponse{
  code:string
}