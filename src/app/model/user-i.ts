export interface UserI {
  id?: number;
  prenom: string;
  nom: string;
  role: string;
  login: string;
  password?: string;
  adresse: string;
  contact: string;
  loginBlockedAgent?: string;
  loginUnblockedAgent?: string;
  comentBlockedAgent?: string;
  comentUnBlockedAgent?: string;
  unblockedDate?: Date;
  etat: string;
  createdAt: Date;
  statusCode: number
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
  expirationTime?: Date;
  articles?: any;
  users?: UserI[];
}
