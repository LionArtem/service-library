interface Id {
  __v: number;
  _id: string;
}

type Jobs = {
  discription: string;
  foto: string;
  nameJob: string;
  remedies: string;
  safetyPrecautions: string;
  spareParts: string;
  tools: string;
  _id: string;
};

type Equipment = {
  listJobs: Jobs[];
  titleEquipment: string;
  _id: string;
};

export type Group = {
  listEquipment: Equipment[];
  titleGroup: string;
  _id: string;
};

export interface User extends Id {
  admin: boolean;
  email: string;
  name: string;
  positionWork: string;
}

export type UserAddProps = {
  email: string;
  password: string;
  name: string;
  positionWork: string;
};

export interface Department extends Id {
  equipmentGroup: Group[];
  titleDepartment: string;
}

export type AddEquipmentProps = {
  idDepartment: string;
  titleGroup: string;
};
