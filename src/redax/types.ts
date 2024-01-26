export type User = {
  admin: boolean;
  email: string;
  name: string;
  positionWork: string;
  __v: number;
  _id: string;
};

export interface UserAddProps {
  email: string;
  password: string;
  name: string;
  positionWork: string;
}
