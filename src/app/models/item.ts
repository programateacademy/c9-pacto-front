export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userImg: string;
}
export interface Interaction{

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
  user:string;
  publication: string; // Cambia esto si el tipo de publication es diferente
  createdAt: Date;
  updatedAt: Date;
  username: string;
  userAvatar: string;
}
