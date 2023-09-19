export interface User {
  _id: string;
  names: string;
  years: number;
  person: String;
  typEntitySocialActor: String;
  companyNameOrentity: String;
  departamentoSelect: String;
  email: String;
  surNames: string;
  gender: String;
  ethnicity: String;
  phoneNumber: number;
  country: String;
  municipioSelect: String;
  userName: string;
  password: string;
  userImg: string;
}
export interface Interaction {

  _id: string;
  userId: string;
  publicationId: string
}
export interface Home extends User {
  user: string;
  date_create: Date;
  description: string;
  image: string | null;
  _id: string;
  username: string;
  userimg: string;
  reactions: boolean;
  interactions: Interaction[]
}
export interface Comment extends User {
  _id: string;
  content: string;
  user: string;
  publication: string; // Cambia esto si el tipo de publication es diferente
  createdAt: Date;
  updatedAt: Date;
  username: string;
  userAvatar: string;
}
