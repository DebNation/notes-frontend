export interface loginResponseType  {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
  };
};

export interface getMeResponseType  {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: null | string;
    createdAt: string;
    updatedAt: string;
  };
};
