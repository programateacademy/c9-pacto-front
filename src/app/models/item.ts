export interface User {
  _id: string;
  names: string;
  years: number;
  person: String;
  typEntitySocialActor: String;
  companyNameOrentity: String;
  departamento: String;
  email: String;
  surNames: string;
  gender: String;
  ethnicity: String;
  phoneNumber: number;
  country: String;
  municipio: String;
  userName: string;
  password: string;
  userImg: string;
  descriptionUser: string;
  interests: string;
  admin: [];
}
export interface Interaction {

  _id: string;
  userId: string;
  publicationId: string
}
export interface Like {
  _id: string; // ID único del like
  userId: string; // ID del usuario que dio like
}
export interface Home extends User {
  user: string;
  date_create: Date;
  description: string;
  image: string | null;
  descriptionImg: string
  _id: string;
  username: string;
  userimg: string;
  likes: Like[];
  likedByUser: boolean;
  showOptions: boolean;
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
