export interface loginResponseType {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: null | string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface getMeResponseType {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: null | string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface getAllNotesResponseType {
  success: boolean;
  data: {
    title: string;
    desc: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
  };
}

export interface NoteType {
  id: number;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
