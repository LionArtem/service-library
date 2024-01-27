interface Id {
  __v: number;
  _id: string;
}

export interface User extends Id {
  admin: boolean;
  email: string;
  name: string;
  positionWork: string;
}

export interface UserAddProps {
  email: string;
  password: string;
  name: string;
  positionWork: string;
}

export interface Department extends Id {
  equipmentGroup: any[];
  titleDepartment: string;
}
